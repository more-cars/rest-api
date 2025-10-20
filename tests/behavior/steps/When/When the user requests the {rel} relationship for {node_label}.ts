import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import type {NodeTypeEnum} from "../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {BaseNode} from "../../../../src/db/types/BaseNode"
import {
    getBasePathFragmentForRelationshipName
} from "../../../_toolbox/dbSeeding/getBasePathFragmentForRelationshipName"

When('the user requests the {string} relationship for {string}',
    async (relationshipName: string, startNodeLabel: string) => {
        const startNode: BaseNode = world.recallNode(startNodeLabel).data
        const startNodeType: NodeTypeEnum = world.recallNode(startNodeLabel).nodeType
        const nodePathFragment = getBasePathFragmentForNodeType(startNodeType)
        const relPathFragment = getBasePathFragmentForRelationshipName(relationshipName)

        const response = await axios
            .get(`${process.env.API_URL}/${nodePathFragment}/${startNode.id}/${relPathFragment}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
