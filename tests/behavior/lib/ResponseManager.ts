import type {ApiResponse} from "./ApiResponse"

let responseCache: ApiResponse

export const ResponseManager = {
    cacheResponse(response: ApiResponse) {
        responseCache = response
    },

    getPreviousResponse() {
        return responseCache
    },
}
