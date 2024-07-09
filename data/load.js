import { serverError } from '../helper/resData.js'
import { sendResponse } from '../helper/helper.js'
import { getDb, closeDb } from '../db/mongodb.js'

export let leagues = []
export let matches = []
export let links = []
export let channels = []

export const loadAll = async() => {
    try {
        await load('matches')
        await load("links")
        await load('channels')
        await load('leagues')
    } finally {
        await closeDb()
    }
}


export const load = async (type) => {
    try {
        const db = await getDb();
        switch (type) {
            case 'matches':
                matches = await db.collection('matches').find().sort({ timeStamp: 1 }).toArray()
                break;
            case 'links':
                links = await db.collection('links').find().toArray()
                break;
            case 'channels':
                channels = await db.collection('channels').find().toArray()
                break;
            case 'leagues':
                leagues = await db.collection('leagues').find().sort({ name: 1 }).toArray()
                break;
            default:
                sendResponse(res, serverError)
        }
    } catch (err) {
        // sendResponse(res, serverError)
        console.log(err)
    }
}