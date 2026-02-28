import {When, world} from "@cucumber/cucumber"
import {DbNode} from "../../../../src/db/types/DbNode"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {getBasePathFragmentForRelationshipName} from "../../lib/getBasePathFragmentForRelationshipName"
import {performApiRequest} from "../../lib/performApiRequest"

When('the user requests the {string} relationship between {string} and {string}',
    async (relationshipName: string, startNodeLabel: string, endNodeLabel: string) => {
        const startNode: DbNode = world.recallNode(startNodeLabel).data
        const startNodeType = world.recallNode(startNodeLabel).nodeType
        const endNode: DbNode = world.recallNode(endNodeLabel).data
        const nodePath = getBasePathFragmentForNodeType(startNodeType)
        const relPath = getBasePathFragmentForRelationshipName(relationshipName)
        const path = `/${nodePath}/${startNode.properties.id}/${relPath}/${endNode.properties.id}`

        const response = await performApiRequest(path, 'GET')
        world.rememberResponse(response)
    })
