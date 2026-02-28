import axios from "axios"
import type {ApiResponse} from "./ApiResponse"

export async function performApiRequest(path: string, method: 'POST' | 'GET' | 'DELETE' = 'GET', data?: any): Promise<ApiResponse> {
    const axiosConfig = {
        baseURL: process.env.API_URL,
        url: path,
        method: method.toLowerCase(),
        data,
    }
    const axiosResponse = await axios.request(axiosConfig)

    return {
        status_code: axiosResponse.status,
        body: axiosResponse.data,
        headers: axiosResponse.headers,
    } satisfies ApiResponse
}
