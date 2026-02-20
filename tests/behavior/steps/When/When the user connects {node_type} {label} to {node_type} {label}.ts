import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import type {NodeTypeEnum} from "../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {DbNode} from "../../../../src/db/types/DbNode"
import {getBasePathFragmentForRelationship} from "../../../_toolbox/dbSeeding/getBasePathFragmentForRelationship"

When('the user connects {string} {string} to {string} {string}',
    async (endNodeType: string, endNodeLabel: string, startNodeType: string, startNodeLabel: string) => {
        const nodePathFragment = getBasePathFragmentForNodeType(startNodeType.toLowerCase() as NodeTypeEnum)
        const startNode: DbNode = world.recallNode(startNodeLabel).data
        const relationshipName = getBasePathFragmentForRelationship(startNodeType.toLowerCase() as NodeTypeEnum, endNodeType.toLowerCase() as NodeTypeEnum)
        const endNode: DbNode = world.recallNode(endNodeLabel).data

        const response = await axios
            .post(`${process.env.API_URL}/${nodePathFragment}/${startNode.id}/${relationshipName}/${endNode.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
