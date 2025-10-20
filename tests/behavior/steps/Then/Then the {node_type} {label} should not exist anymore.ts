import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import type {NodeTypeEnum} from "../../../../src/controllers/nodes/types/NodeTypeEnum"

Then('the {string} {string} should not exist anymore',
    async (nodeType: string, label: string) => {
        const node = world.recallNode(label).data
        const path = getBasePathFragmentForNodeType(nodeType.toLowerCase() as NodeTypeEnum)

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
