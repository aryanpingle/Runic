/**
 * Get the URI for an SVG.
 */
export function svgToUri(svgElement: SVGElement): string {
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

    // Scale up the SVG by drawing it onto a scaled up canvas
    const TARGET_WIDTH = 2000;
    const viewBox = svgElement.getAttribute("viewBox").split(/\s+/g);
    const viewBoxWidth = parseFloat(viewBox[2]);
    const viewBoxHeight = parseFloat(viewBox[3]);
    tempCanvas.width = TARGET_WIDTH;
    tempCanvas.height = (TARGET_WIDTH / viewBoxWidth) * viewBoxHeight;

    // When the image is actually prepared, then return the URI
    return new Promise((resolve, reject) => {
        tempImage.onload = function () {
            const ctx = tempCanvas.getContext("2d");

            ctx.drawImage(tempImage, 0, 0, tempCanvas.width, tempCanvas.height);

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
