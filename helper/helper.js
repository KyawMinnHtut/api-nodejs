export const sendResponse = (res, obj) => {
    res.writeHead(obj.statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(obj.data));
}

export const isAdmin = (string) => {
    return string.startsWith("/v1/admin")
}

export const isPublic = (string) => {
    return string.startsWith("/v1/api")
}

export const getPath = (req) => {
    const parsedUrl = new URL(`http://${req.headers.host}${req.url}`);
    return parsedUrl.pathname.split("/").pop();
}

export const getParams = (req) => {
    const parsedUrl = new URL(`http://${req.headers.host}${req.url}`)
    return parsedUrl.searchParams

}