/// <reference lib="webworker" />
declare let self: ServiceWorkerGlobalScope;

const IS_DEVELOPMENT =
    self.registration.scope.includes("127.0.0.1") ||
    self.registration.scope.includes("localhost");

const log = (text: string, color = "rgb(128, 128, 128)") =>
    IS_DEVELOPMENT &&
    console.log(
        `%c${text}`,
        `color: black !important; background-color: ${color};`,
    );

const ENABLE_CACHING = IS_DEVELOPMENT;

const CACHE_NAME = "runic-cache-1";
let CACHE: Cache = null;

self.addEventListener("install", (event) => {
    log("Service Worker Installed");

    self.skipWaiting();
});

self.addEventListener("activate", async (event) => {
    log("Service Worker Activated");

    // Take over immediately
    event.waitUntil(
        (async () => {
            // @ts-ignore
            await clients.claim();
        })(),
    );
});

self.addEventListener("fetch", (fetchEvent) => {
    fetchEvent.respondWith(
        ENABLE_CACHING
            ? handleFetchRequest(fetchEvent)
            : fetch(fetchEvent.request),
    );
});

function isResourceRequest(urlString: string) {
    // Analytics script
    if (urlString.includes("googletagmanager.com/gtag")) return true;
    // IPA dictionary
    if (urlString.includes("ipa_dict.json")) return true;
    // Google Fonts
    if (urlString.includes("fonts.googleapis.com")) return true;
    return false;
}

async function handleFetchRequest(fetchEvent: FetchEvent) {
    const request: Request = fetchEvent.request;

    // Network fetch for analytics
    if (request.url.includes("google-analytics.com")) {
        return await fetch(request);
    }

    // Instantiate the cache
    if (CACHE == null) {
        CACHE = await caches.open(CACHE_NAME);
    }

    // If the request is for a static resource, then use a cache-first strategy
    // Preserves query and fragment portions of the URL
    if (isResourceRequest(request.url)) {
        const cacheMatch = await CACHE.match(request);
        if (cacheMatch === undefined) {
            // Perform network request
            return await fetch(request).then((response) => {
                // https://stackoverflow.com/a/39109790/8089674
                // Since no-cors will have been enabled for this fetch request,
                // the response will be "opaque" i.e. status 0

                // TODO: Don't assume the response is OK, check the content-length or smth
                cacheResponse(request, response);

                return response;
            });
        }
        return cacheMatch;
    }

    // For everything else, use a network-first strategy
    return await requestForDocument(request);
}

/**
 * Save a copy of the response to the cache.
 */
function cacheResponse(request: Request, response: Response) {
    let clone = response.clone();
    CACHE.put(request, clone);
}

/**
 * Returns a network fetch for the request and saves it to the given cache.
 * Asynchronously handled, so you can call this function and forget about it
 */
async function networkFetchWithCache(request: Request) {
    const response = await fetch(request);

    // Only cache 2xx responses
    if (response.ok) {
        cacheResponse(request, response);
    }

    return response;
}

async function requestForDocument(request: Request) {
    // For all documents, strip the query and fragment portions of the URL
    const requestUrl = new URL(request.url);
    requestUrl.search = "";
    requestUrl.hash = "";
    const urlNoSearch = requestUrl.toString();

    // Create a clone of the request using the new URL
    const newRequest = new Request(urlNoSearch);

    try {
        return await networkFetchWithCache(newRequest);
    } catch (err) {
        // Something went wrong with the fetch request itself
        // Try returning a cached version (if it exists)
        const cacheMatch = await CACHE.match(newRequest);

        // If there's nothing in the cache, throw an error
        if (cacheMatch === undefined) {
            // Screw it, throw the error
            throw err;
        }

        // Return the cache match
        return cacheMatch;
    }
}
