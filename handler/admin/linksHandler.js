import { sendResponse, getParams } from "../../helper/helper.js"
import { add, remove, update } from "../../repository/data.js"
import { resData, badRequest } from "../../helper/resData.js"

export const handleLinksPost = (req, res) => {
    let requestBody = ''
    req.on('data', (chunk) => {
        requestBody += chunk
    })
    req.on('end', () => {
        const data = JSON.parse(requestBody)
        add(data, 'links')
            .then(newData => sendResponse(res, resData(201, newData)))
            .catch(() => sendResponse(res, badRequest))
    })
}

export const handleLinksPut = (req, res) => {

    const params = getParams(req)
    const id = params.get("id")

    let requestBody = ''
    req.on('data', (chunk) => {
        requestBody += chunk
    })
    req.on('end', () => {
        const data = JSON.parse(requestBody)
        update(id, data, 'links')
            .then(updateData => sendResponse(res, resData(200, updateData)))
            .catch(() => sendResponse(res, badRequest))
    })
}

export const handleLinksDelete = (req, res) => {

    const params = getParams(req)
    const id = params.get("id")
    // const linkId = params.get("linkId")


    remove(id, 0, 'links')
        .then(message => sendResponse(res, resData(200, message)))
        .catch(() => sendResponse(res, badRequest))
}
