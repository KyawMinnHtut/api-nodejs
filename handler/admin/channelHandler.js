import { sendResponse, getParams } from "../../helper/helper.js"
import { add, remove, update } from "../../repository/data.js"
import { badRequest, resData } from "../../helper/resData.js"

export const handleChannelPost = (req, res) => {
    let requestBody = ''
    req.on('data', (chunk) => {
        requestBody += chunk
    })
    req.on('end', () => {
        const data = JSON.parse(requestBody)
        add(data, 'channels')
            .then(newData => sendResponse(res, resData(201, newData)))
            .catch(() => sendResponse(res, badRequest))
    })
}

export const handleChannelPut = (req, res) => {

    const params = getParams(req)
    const id = (params.get("id"))

    let requestBody = ''
    req.on('data', (chunk) => {
        requestBody += chunk
    })
    req.on('end', () => {
        const data = JSON.parse(requestBody)
        update(id, data, 'channels')
            .then(updateData => sendResponse(res, resData(200, updateData)))
            .catch(() => sendResponse(res, badRequest))
    })
}


export const handleChannelDelete = (req, res) => {

    const params = getParams(req)
    const id = (params.get("id"))

    remove(id, 0, 'channels')
        .then(message => sendResponse(res, resData(200, message)))
        .catch(() => sendResponse(res, badRequest))
}