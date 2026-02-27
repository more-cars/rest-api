import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import type {ControllerNodeType} from "../../../../src/controllers/types/ControllerNodeType"

Then('the {string} {string} should not exist anymore',
    async (nodeType: string, label: string) => {
        const node = world.recallNode(label).data
        const path = getBasePathFragmentForNodeType(nodeType.toLowerCase() as ControllerNodeType)

        const response = await axios
            .get(`${process.env.API_URL}/${path}/${node.id}`)
            .catch(error => {
                console.error(error)
            })

        if (!response) {
            assert.fail('Request failed')
        }

        assert.equal(response.status, 404)
    })
