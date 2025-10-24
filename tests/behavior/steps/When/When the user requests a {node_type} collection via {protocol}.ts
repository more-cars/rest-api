import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import type {NodeTypeEnum} from "../../../../src/controllers/nodes/types/NodeTypeEnum"
import assert from "assert"
import https from "https"

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

        const path = getBasePathFragmentForNodeType(nodeType.toLowerCase() as NodeTypeEnum)

        const agent = new https.Agent({
            rejectUnauthorized: false
        })
        const response = await axios
            .get(`${apiUrl}/${path}`, {httpsAgent: agent})

        world.rememberResponse(response)
    })
