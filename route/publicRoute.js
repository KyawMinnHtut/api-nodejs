import { getPath, sendResponse } from "../helper/helper.js"
import { handleChannelsGet, handleMatchesGet, handleLinksGet } from "../handler/dataHandler.js";
import { notAllowed, notFound } from "../helper/resData.js";

export const handleRoutes = (req, res) => {
    if (req.method === 'GET') {
        const path = getPath(req)
        switch (path) {
            case 'matches':
                handleMatchesGet(res);
                break;
            case 'links':
                handleLinksGet(req, res)
                break;
            case 'channels':
                handleChannelsGet(res)
                break;
            default:
                sendResponse(res, notFound)

        }
    } else {
        sendResponse(res, notAllowed);
    }
}