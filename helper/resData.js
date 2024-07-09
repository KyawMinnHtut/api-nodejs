export const resData = (code, info) => {
    return  {
        statusCode: code,
        data: info
    }
}

export const badRequest = resData(400, {error:"Bad request"})

export const forbidden = resData(403, {error: "Forbidden"})

export const unauthorized = resData (401, { error: "Unauthorized"})

export const notFound = resData(404, {error: "Not Found"})

export const notAllowed = resData(405, {error: "Not Allowed"})

export const serverError = resData(500, {error:"Internal Server Error"})
