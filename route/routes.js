import { isAdmin, isPublic, sendResponse } from '../helper/helper.js';
import { notFound } from '../helper/resData.js';
import { verifyAdminToken, verifyToken } from '../middleware/apikeyMiddleware.js';
import { handleAdminRoutes } from './adminRoute.js';
import { handleRoutes } from './publicRoute.js';

export const handleRequest = (req, res) => {
    const url =  req.url
    if (isAdmin(url)){
        verifyAdminToken(req, res, () => {
            handleAdminRoutes(req, res);
        })
    }
    else if (isPublic(url)) {
        verifyToken(req, res, () =>{
            handleRoutes(req, res)
        }) 
    } else {
        sendResponse(res, notFound);
    }
}