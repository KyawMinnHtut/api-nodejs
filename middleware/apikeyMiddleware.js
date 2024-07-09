import { sendResponse } from "../helper/helper.js";
import { unauthorized } from "../helper/resData.js";

export function verifyToken(req, res, next) {
  const token = "secret-api-key";
  const apiKey = req.headers['api-key']

  if (!apiKey || apiKey !== token ) {
    return sendResponse(res, unauthorized);
  }
  next();
}

export function verifyAdminToken(req, res, next) {
  const token = "admin-api-key";
  const apiKey = req.headers['api-key']

  if (!apiKey || apiKey !== token) {
    return sendResponse(res, unauthorized);
  }
  next();
}