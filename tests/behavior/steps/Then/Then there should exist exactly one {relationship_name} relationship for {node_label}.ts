import {Then, world} from "@cucumber/cucumber"
import axios from "axios"
import assert from "assert"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {dasherize} from "inflection"
import type {DbNode} from "../../../../src/db/types/DbNode"

Then('there should exist exactly one {string} relationship for {string}',
    async (relationshipName: string, nodeLabel: string) => {
        const node: DbNode = world.recallNode(nodeLabel).data
        const path = getBasePathFragmentForNodeType(world.recallNode(nodeLabel).nodeType)

        const response = await axios
            .get(`${process.env.API_URL}/${path}/${node.properties.id}/${dasherize(relationshipName)}`)
            .catch(error => {
                console.error(error)
            })

        if (!response) {
            assert.fail('Request failed')
        }

        assert.equal(Array.isArray(response.data.data), false)
        assert(response.data.data.relationship_id !== undefined)
    })
