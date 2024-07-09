import { getParams, sendResponse } from "../../helper/helper.js"
import { badRequest, resData } from "../../helper/resData.js"
import { add, remove, update } from "../../repository/data.js"

export const handleMatchPost = (req, res) => {
    let requestBody = ''
    req.on('data', (chunk) => {
        requestBody += chunk
    })
    req.on('end', () => {
        const data = JSON.parse(requestBody)
        add(data, 'matches')
            .then(newData => sendResponse(res, resData(201, newData)))
            .catch(() => sendResponse(res, badRequest))
    })
}

export const handleMatchPut = (req, res) => {

    const params = getParams(req)
    const id = params.get("id")

    let requestBody = ''
    req.on('data', (chunk) => {
        requestBody += chunk
    })
    req.on('end', () => {
        const data = JSON.parse(requestBody)
        update(id, data, 'matches')
            .then(updateData => sendResponse(res, resData(200, updateData)))
            .catch(() => sendResponse(res, badRequest))
    })
}

export const handleMatchDelete = (req, res) => {
    const params = getParams(req)
    const id = params.get("id")

    remove(id, 0, 'matches')
        .then(message => sendResponse(res, resData(200, message)))
        .catch(() => sendResponse(res, badRequest))
}