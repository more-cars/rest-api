import {getJiraApiAuthKey} from "../../../rest-api-ticket-generator/lib/getJiraApiAuthKey"
import type {ApiResponse} from "./ApiResponse"
import {ResponseManager} from "./ResponseManager"

export async function performApiRequest(path: string, method: 'POST' | 'GET' | 'PATCH' | 'DELETE' = 'GET', data?: unknown): Promise<ApiResponse> {
    const response = await fetch(process.env.API_URL + path, {
            method,
            headers: {
                'Authorization': `Basic ${getJiraApiAuthKey()}`,
                'Content-Type': 'application/json',
                'user-namespace': process.env.UNIQUE_TEST_ID || '',
            },
            body: JSON.stringify(data),
        }
    )

    let responseBody = await response.text()
    try {
        responseBody = JSON.parse(responseBody)
    } catch (e) {

    }

    const apiResponse = {
        status_code: response.status,
        body: responseBody,
        headers: Object.fromEntries(response.headers),
    } satisfies ApiResponse

    ResponseManager.cacheResponse(apiResponse)

    return apiResponse
}
