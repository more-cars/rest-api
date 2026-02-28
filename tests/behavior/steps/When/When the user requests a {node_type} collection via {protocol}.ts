import {When} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import assert from "assert"
import type {ApiResponse} from "../../lib/ApiResponse"
import {ResponseManager} from "../../lib/ResponseManager"

When('the user requests a {string} collection via {string}',
    async (nodeType: string, protocol: string) => {
        const apiUrl = process.env.API_URL

        if (!['http', 'https'].includes(protocol.toLowerCase())) {
            assert.fail(`${protocol} is not a valid protocol`)
        }

        if (!apiUrl) {
            assert.fail('API URL is missing')
        }

        if (protocol === 'https') {
            apiUrl.replace('http://', 'https://')
            apiUrl.replace(':3000', ':3443')
        }

        if (protocol === 'http') {
            apiUrl.replace('https://', 'http://')
            apiUrl.replace(':3443', ':3000')
        }

        const path = getBasePathFragmentForNodeType(nodeType)

        const response = await axios
            .get(`${apiUrl}/${path}`)

        const apiResponse = {
            status_code: response.status,
            body: response.data,
            headers: response.headers,
        } satisfies ApiResponse

        ResponseManager.cacheResponse(apiResponse)
    })
