import { getPath, sendResponse } from "../helper/helper.js"
import { handleLeaguesGet, handleLeaguesPost, handleLeaguesPut, handleLeaguesDelete } from "../handler/admin/leaguesHandler.js";
import { handleMatchPost, handleMatchPut, handleMatchDelete } from "../handler/admin/matchHandler.js";
import { handleLinksPost, handleLinksPut, handleLinksDelete } from "../handler/admin/linksHandler.js";
import { handleChannelPost, handleChannelPut, handleChannelDelete } from "../handler/admin/channelHandler.js";
import { notAllowed, notFound } from "../helper/resData.js";
import {   handleChannelsGet,    handleLinksGet,   handleMatchesGet } from "../handler/dataHandler.js";

export const handleAdminRoutes = (req, res) => {
    const path = getPath(req)
    const method = req.method
    switch (path) {
        case 'leagues':
            switch (method) {
                case 'GET':
                    handleLeaguesGet(res)
                    break;
                case 'POST':
                    handleLeaguesPost(req, res)
                    break;
                case 'PUT':
                    handleLeaguesPut(req, res)
                    break;
                case 'DELETE':
                    handleLeaguesDelete(req, res)
                    break;
                default:
                    sendResponse(res, notAllowed);
            }
            break;
        case 'matches':
            switch (method) {
                case 'GET':
                    handleMatchesGet(res)
                    break;
                case 'POST':
                    handleMatchPost(req, res)
                    break;
                case 'PUT':
                    handleMatchPut(req, res)
                    break;
                case 'DELETE':
                    handleMatchDelete(req, res)
                    break;
                default:
                    sendResponse(res, notAllowed);
            }
            break;
        case 'links':
            switch (method) {
                case 'GET':
                    handleLinksGet(req, res)
                    break;
                case 'POST':
                    handleLinksPost(req, res)
                    break;
                case 'PUT':
                    handleLinksPut(req, res)
                    break;
                case 'DELETE':
                    handleLinksDelete(req, res)
                    break;
                default:
                    sendResponse(res, notAllowed);
            }
            break;
        case 'channels':
            switch (method) {
                case 'GET':
                    handleChannelsGet(res)
                    break;
                case 'POST':
                    handleChannelPost(req, res)
                    break;
                case 'PUT':
                    handleChannelPut(req, res)
                    break;
                case 'DELETE':
                    handleChannelDelete(req, res)
                    break;
                default:
                    sendResponse(res, notAllowed);
            }
            break;
        default:
            sendResponse(res, notFound);
    }
}