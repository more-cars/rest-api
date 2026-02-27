import {Then, world} from "@cucumber/cucumber"
import axios from "axios"
import assert from "assert"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {dasherize} from "inflection"
import type {DbNode} from "../../../../src/db/types/DbNode"

Then('there should exist a {string} relationship between {string} and {string}',
    async (relationshipName: string, startNodeLabel: string, endNodeLabel: string) => {
        const startNode: DbNode = world.recallNode(startNodeLabel).data
        const endNode: DbNode = world.recallNode(endNodeLabel).data
        const nodePathFragment = getBasePathFragmentForNodeType(world.recallNode(startNodeLabel).nodeType)

        const response = await axios
            .get(`${process.env.API_URL}/${nodePathFragment}/${startNode.properties.id}/${dasherize(relationshipName)}`)
            .catch(error => {
                console.error(error)
            })

        if (!response) {
            assert.fail('request failed')
        }

        assert.equal(response.status, 200)

        if (Array.isArray(response.data.data)) {
            let success = false

            response.data.data.forEach((relationship: any) => {
                if (relationship.data.relationship_partner.data.id === endNode.properties.id) {
                    success = true
                }
            })

            assert.equal(success, true, `None of the returned relationships contains the node #${endNode.properties.id}.`)
        } else if ('relationship_partner' in response.data.data) {
            assert.equal(response.data.data.relationship_partner.data.id, endNode.properties.id, `The returned relationship does not contain the node #${endNode.properties.id}.`)
        } else {
            assert.fail('respond did not return any relationship')
        }
    })
