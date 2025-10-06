import {Then, world} from "@cucumber/cucumber"
import axios from "axios"
import assert from "assert"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import {dasherize} from "inflection"

Then('there should exist exactly one {string} relationship for {string}',
    async (relationshipName: string, nodeLabel: string) => {
        const node = world.recallNode(nodeLabel).data
        const path = getBasePathFragmentForNodeType(world.recallNode(nodeLabel).nodeType)

        const response = await axios
            .get(`${process.env.API_URL}/${path}/${node.id}/${dasherize(relationshipName)}`)
            .catch(error => {
                console.error(error)
            })

        if (!response) {
            assert.fail('Request failed')
        }

        assert.equal(Array.isArray(response.data), false)
        assert(response.data.relationship_id !== undefined)
    })
