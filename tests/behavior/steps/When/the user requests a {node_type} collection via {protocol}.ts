import {When} from "@cucumber/cucumber"
import assert from "assert"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {performApiRequest} from "../../lib/performApiRequest"

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

        process.env.API_URL = apiUrl
        const path = getBasePathFragmentForNodeType(nodeType)

        await performApiRequest('/' + path, 'GET')
    })
