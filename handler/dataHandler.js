import { getParams, sendResponse } from "../helper/helper.js";
import { channels, matches, links } from "../data/load.js";
import { resData } from "../helper/resData.js";

const handleMatchesGet = (res) => {
    sendResponse(res, resData(200, matches));
}

const handleLinksGet = (req, res) => {
    const params = getParams(req)
    const id = params.get("matchId")
    sendResponse(res, resData(200, links.filter((link) => link.matchId == id)));
}

const handleChannelsGet = (res) => {
    sendResponse(res, resData(200, channels));
}

export { handleMatchesGet, handleLinksGet, handleChannelsGet }