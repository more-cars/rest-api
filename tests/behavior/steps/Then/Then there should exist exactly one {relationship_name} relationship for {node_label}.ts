import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {dasherize} from "inflection"
import type {DbNode} from "../../../../src/db/types/DbNode"
import {performApiRequest} from "../../lib/performApiRequest"

Then('there should exist exactly one {string} relationship for {string}',
    async (relationshipName: string, nodeLabel: string) => {
        const node: DbNode = world.recallNode(nodeLabel).data
        const nodePath = getBasePathFragmentForNodeType(world.recallNode(nodeLabel).nodeType)
        const path = `/${nodePath}/${node.properties.id}/${dasherize(relationshipName)}`

        const response = await performApiRequest(path, 'GET')

        assert.equal(Array.isArray(response.body.data), false)
        assert(response.body.data.relationship_id !== undefined)
    })
