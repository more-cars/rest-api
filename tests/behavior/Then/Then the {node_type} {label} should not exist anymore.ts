import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import type {NodeType} from "../../_toolbox/NodeType"

Then('the {string} {string} should not exist anymore',
    async (nodeType: string, label: string) => {
        const node = world.recallNode(label)
        const path = await getBasePathFragmentForNodeType(nodeType.toLowerCase() as NodeType)

        const response = await axios
            .get(`${process.env.API_URL}/${path}/${node.id}`, {
                validateStatus: function (status) {
                    return status === 404 // treating the 404 as a "good" status code, so axios does not fail the request
                }
            })
            .catch(error => {
                console.error(error)
            })

        if (!response) {
            assert.fail('Request failed')
        }

        assert.equal(response.status, 404)
    })
