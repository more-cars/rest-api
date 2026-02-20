import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {DbNode} from "../../../../src/db/types/DbNode"
import type {ControllerNodeType} from "../../../../src/controllers/nodes/types/ControllerNodeType"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import {getBasePathFragmentForRelationshipName} from "../../../_toolbox/dbSeeding/getBasePathFragmentForRelationshipName"

When('the user deletes the {string} relationship between {string} and {string}',
    async (relationshipName: string, startNodeLabel: string, endNodeLabel: string) => {
        const startNode: DbNode = world.recallNode(startNodeLabel).data
        const startNodeType: ControllerNodeType = world.recallNode(startNodeLabel).nodeType
        const endNode: DbNode = world.recallNode(endNodeLabel).data
        const nodePathFragment = getBasePathFragmentForNodeType(startNodeType)
        const relPathFragment = getBasePathFragmentForRelationshipName(relationshipName)

        const response = await axios
            .delete(`${process.env.API_URL}/${nodePathFragment}/${startNode.id}/${relPathFragment}/${endNode.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
