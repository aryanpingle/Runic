/**
 * Get the URI for an SVG.
 */
function svgToUri(svgElement: SVGElement): string {
    let svgUri = null;

    // If no SVG URI Exists, generate it! Otherwise short-circuit it!
    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svgElement);

    // Add XML declaration
    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

    // Convert SVG source to URI data scheme
    svgUri = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);

    return svgUri;
}

export async function drawSVGToCanvas(
    svgElement: SVGElement,
): Promise<HTMLCanvasElement> {
    const svgUri = svgToUri(svgElement);
    let tempCanvas = document.createElement("canvas");
    let tempImage = new Image();
    tempImage.src = svgUri;
    tempCanvas.width = svgElement.clientWidth;
    tempCanvas.height = svgElement.clientHeight;

    // When the image is actually prepared, then return the URI
    return new Promise((resolve, reject) => {
        tempImage.onload = function () {
            const ctx = tempCanvas.getContext("2d");

            ctx.drawImage(
                tempImage,
                0,
                0,
                svgElement.clientWidth,
                svgElement.clientHeight,
            );

            resolve(tempCanvas);
        };
    });
}

export function downloadURI(uri: string, filename: string = "tempfilename") {
    let link = document.createElement("a");
    link.download = filename;
    link.href = uri;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    link = null;
}
