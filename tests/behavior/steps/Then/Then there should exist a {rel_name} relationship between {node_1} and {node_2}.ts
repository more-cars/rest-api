import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {dasherize} from "inflection"
import {NodeManager} from "../../lib/NodeManager"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {performApiRequest} from "../../lib/performApiRequest"
import type {RelationResponseItem} from "../../../../src/controllers/types/RelationResponseItem"

Then('there should exist a {string} relationship between {string} and {string}',
    async (relationshipName: string, startNodeLabel: string, endNodeLabel: string) => {
        const startNode = NodeManager.getNodeByLabel(startNodeLabel)
        const endNode = NodeManager.getNodeByLabel(endNodeLabel)
        const nodePath = getBasePathFragmentForNodeType(startNode.node_type)
        const path = `/${nodePath}/${startNode.fields.id}/${dasherize(relationshipName)}`

        const response = await performApiRequest(path, 'GET')

        assert.equal(response.status_code, 200)

        if (Array.isArray(response.body.data)) {
            const data: RelationResponseItem[] = response.body.data
            const match = data.find(relationship => relationship.id === endNode.fields.id)
            assert.notEqual(match, undefined, `None of the returned relationships contains the node #${endNode.fields.id}.`)
        } else if (response.body.data !== null) {
            assert.equal(response.body.data.id, endNode.fields.id, `The returned relationship does not contain the node #${endNode.fields.id}.`)
        } else {
            assert.fail('respond did not return any relationship')
        }
    })
