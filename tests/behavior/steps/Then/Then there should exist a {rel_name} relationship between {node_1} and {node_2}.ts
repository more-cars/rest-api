import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import {dasherize} from "inflection"
import type {DbNode} from "../../../../src/db/types/DbNode"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {performApiRequest} from "../../lib/performApiRequest"

Then('there should exist a {string} relationship between {string} and {string}',
    async (relationshipName: string, startNodeLabel: string, endNodeLabel: string) => {
        const startNode: DbNode = world.recallNode(startNodeLabel).data
        const endNode: DbNode = world.recallNode(endNodeLabel).data
        const nodePath = getBasePathFragmentForNodeType(world.recallNode(startNodeLabel).nodeType)
        const path = `/${nodePath}/${startNode.properties.id}/${dasherize(relationshipName)}`

        const response = await performApiRequest(path, 'GET')

        assert.equal(response.status_code, 200)

        if (Array.isArray(response.body.data)) {
            let success = false

            response.body.data.forEach((relationship: any) => {
                if (relationship.data.relationship_partner.data.id === endNode.properties.id) {
                    success = true
                }
            })

            assert.equal(success, true, `None of the returned relationships contains the node #${endNode.properties.id}.`)
        } else if ('relationship_partner' in response.body.data) {
            assert.equal(response.body.data.relationship_partner.data.id, endNode.properties.id, `The returned relationship does not contain the node #${endNode.properties.id}.`)
        } else {
            assert.fail('respond did not return any relationship')
        }
    })
