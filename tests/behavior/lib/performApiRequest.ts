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

    const apiResponse = {
        status_code: response.status,
        body: await extractResponseBody(response),
        headers: Object.fromEntries(response.headers),
    } satisfies ApiResponse

    ResponseManager.cacheResponse(apiResponse)

    return apiResponse
}

async function extractResponseBody(response: Response) {
    const responseBody = await response.text()
    try {
        return JSON.parse(responseBody)
    } catch (e) {
        console.error(e)
        return responseBody
    }
}
