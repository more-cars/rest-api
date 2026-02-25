import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import type {ControllerNodeType} from "../../../../src/controllers/types/ControllerNodeType"
import type {DbNode} from "../../../../src/db/types/DbNode"
import {getBasePathFragmentForRelationship} from "../../../_toolbox/dbSeeding/getBasePathFragmentForRelationship"

When('the user connects {string} {string} to {string} {string}',
    async (endNodeType: string, endNodeLabel: string, startNodeType: string, startNodeLabel: string) => {
        const nodePathFragment = getBasePathFragmentForNodeType(startNodeType.toLowerCase() as ControllerNodeType)
        const startNode: DbNode = world.recallNode(startNodeLabel).data
        const relationshipName = getBasePathFragmentForRelationship(startNodeType.toLowerCase() as ControllerNodeType, endNodeType.toLowerCase() as ControllerNodeType)
        const endNode: DbNode = world.recallNode(endNodeLabel).data

        const response = await axios
            .post(`${process.env.API_URL}/${nodePathFragment}/${startNode.properties.id}/${relationshipName}/${endNode.properties.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
