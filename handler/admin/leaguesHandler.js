import { leagues } from '../../data/load.js';
import { sendResponse, getParams } from "../../helper/helper.js"
import { resData, badRequest } from '../../helper/resData.js';
import { add, remove, update } from "../../repository/data.js"

export const handleLeaguesGet = (res) => {
    sendResponse(res, resData(200, leagues))
}

export const handleLeaguesPost = (req, res) => {
    let requestBody = ''
    req.on('data', (chunk) => {
        requestBody += chunk
    })
    req.on('end', () => {
        const data = JSON.parse(requestBody)
        add(data, 'leagues')
            .then(newData => sendResponse(res, resData(201, newData)))
            .catch(() => sendResponse(res, badRequest))
    })
}

export const handleLeaguesPut = (req, res) => {

    const params = getParams(req)
    const id = params.get("id");

    let requestBody = '';
    req.on('data', (chunk) => {
        requestBody += chunk;
    })
    req.on('end', () => {
        const data = JSON.parse(requestBody)
        update(id, data, 'leagues')
            .then(updateData => sendResponse(res, resData(200, updateData)))
            .catch(() => sendResponse(res, badRequest))
    })
}


export const handleLeaguesDelete = (req, res) => {

    const params = getParams(req)
    const id = params.get("id");
    const teamId = params.get("teamId")

    console.log(id)
    console.log(teamId)

    remove(id, teamId, 'leagues')
        .then(message => sendResponse(res, resData(200, message)))
        .catch(() => sendResponse(res, badRequest))
}