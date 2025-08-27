import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import type {NodeType} from "../../_toolbox/NodeType"
import type {BaseNode} from "../../../src/db/types/BaseNode"
import {getBasePathFragmentForRelationship} from "../../_toolbox/dbSeeding/getBasePathFragmentForRelationship"

When('the user requests the relationship between {string} {string} and {string} {string}',
    async (startNodeType: string, startNodeLabel: string, endNodeType: string, endNodeLabel: string) => {
        const nodePathFragment = getBasePathFragmentForNodeType(startNodeType.toLowerCase() as NodeType)
        const startNode: BaseNode = world.recallNode(startNodeLabel).data
        const relationshipName = getBasePathFragmentForRelationship(startNodeType.toLowerCase() as NodeType, endNodeType.toLowerCase() as NodeType)
        const endNode: BaseNode = world.recallNode(endNodeLabel).data

        const response = await axios
            .get(`${process.env.API_URL}/${nodePathFragment}/${startNode.id}/${relationshipName}/${endNode.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
