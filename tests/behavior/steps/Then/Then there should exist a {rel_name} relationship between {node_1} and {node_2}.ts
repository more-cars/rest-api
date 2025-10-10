import {Then, world} from "@cucumber/cucumber"
import axios from "axios"
import assert from "assert"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import {dasherize} from "inflection"
import type {BaseNode} from "../../../../src/db/types/BaseNode"

Then('there should exist a {string} relationship between {string} and {string}',
    async (relationshipName: string, startNodeLabel: string, endNodeLabel: string) => {
        const startNode: BaseNode = world.recallNode(startNodeLabel).data
        const endNode = world.recallNode(endNodeLabel).data
        const nodePathFragment = getBasePathFragmentForNodeType(world.recallNode(startNodeLabel).nodeType)

        const response = await axios
            .get(`${process.env.API_URL}/${nodePathFragment}/${startNode.id}/${dasherize(relationshipName)}/${endNode.id}`)
            .catch(error => {
                console.error(error)
            })

        assert.equal(response?.status, 200)
        assert(response?.data.data.relationship_id !== undefined)
    })
