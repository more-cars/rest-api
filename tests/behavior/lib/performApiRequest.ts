import axios from "axios"
import type {ApiResponse} from "./ApiResponse"
import {ResponseManager} from "./ResponseManager"

// By default, Axios fails every request that returns with a status code >= 400.
// But for the tests we only want them to fail when a server error occurred (status code >= 500).
axios.defaults.validateStatus = function (status) {
    return status < 500
}

export async function performApiRequest(path: string, method: 'POST' | 'GET' | 'DELETE' = 'GET', data?: any): Promise<ApiResponse> {
    const axiosConfig = {
        baseURL: process.env.API_URL,
        url: path,
        method: method.toLowerCase(),
        data,
    }

    const axiosResponse = await axios.request(axiosConfig)

    const apiResponse = {
        status_code: axiosResponse.status,
        body: axiosResponse.data,
        headers: axiosResponse.headers,
    } satisfies ApiResponse

    ResponseManager.cacheResponse(apiResponse)

    return apiResponse
}
