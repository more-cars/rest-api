import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {BaseNode} from "../../../../src/db/types/BaseNode"
import type {NodeType} from "../../../_toolbox/NodeType"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import {
    getBasePathFragmentForRelationshipName
} from "../../../_toolbox/dbSeeding/getBasePathFragmentForRelationshipName"

When('the user deletes the {string} relationship between {string} and {string}',
    async (relationshipName: string, startNodeLabel: string, endNodeLabel: string) => {
        const startNode: BaseNode = world.recallNode(startNodeLabel).data
        const startNodeType: NodeType = world.recallNode(startNodeLabel).nodeType
        const endNode: BaseNode = world.recallNode(endNodeLabel).data
        const nodePathFragment = getBasePathFragmentForNodeType(startNodeType)
        const relPathFragment = getBasePathFragmentForRelationshipName(relationshipName)

        const response = await axios
            .delete(`${process.env.API_URL}/${nodePathFragment}/${startNode.id}/${relPathFragment}/${endNode.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
