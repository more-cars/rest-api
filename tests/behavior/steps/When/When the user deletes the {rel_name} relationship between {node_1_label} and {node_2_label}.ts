import {When, world} from "@cucumber/cucumber"
import {DbNode} from "../../../../src/db/types/DbNode"
import type {ControllerNodeType} from "../../../../src/controllers/types/ControllerNodeType"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {getBasePathFragmentForRelationshipName} from "../../lib/getBasePathFragmentForRelationshipName"
import {performApiRequest} from "../../lib/performApiRequest"

When('the user deletes the {string} relationship between {string} and {string}',
    async (relationshipName: string, startNodeLabel: string, endNodeLabel: string) => {
        const startNode: DbNode = world.recallNode(startNodeLabel).data
        const startNodeType: ControllerNodeType = world.recallNode(startNodeLabel).nodeType
        const endNode: DbNode = world.recallNode(endNodeLabel).data
        const nodePath = getBasePathFragmentForNodeType(startNodeType)
        const relPath = getBasePathFragmentForRelationshipName(relationshipName)
        const path = `/${nodePath}/${startNode.properties.id}/${relPath}/${endNode.properties.id}`

        const response = await performApiRequest(path, 'DELETE')
        world.rememberResponse(response)
    })
