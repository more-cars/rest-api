import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {dasherize} from "inflection"
import type {DbNode} from "../../../../src/db/types/DbNode"
import {performApiRequest} from "../../lib/performApiRequest"

Then('there should exist NO {string} relationship between {string} and {string}',
    async (relationshipName: string, startNodeLabel: string, endNodeLabel: string) => {
        const startNode: DbNode = world.recallNode(startNodeLabel).data
        const endNode = world.recallNode(endNodeLabel).data
        const nodePath = getBasePathFragmentForNodeType(world.recallNode(startNodeLabel).nodeType)
        const path = `/${nodePath}/${startNode.properties.id}/${dasherize(relationshipName)}`

        const response = await performApiRequest(path, 'GET')

        assert.equal(response.status_code, 200)

        if (Array.isArray(response.body.data)) {
            assert.fail('NOT IMPLEMENTED') // TODO
        } else if ('relationship_partner' in response.body.data) {
            assert.notEqual(response.body.data.relationship_partner.data.id, endNode.id)
        } else {
            assert.ok(true)
        }
    })
