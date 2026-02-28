import {When, world} from "@cucumber/cucumber"
import type {DbNode} from "../../../../src/db/types/DbNode"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {getBasePathFragmentForRelationshipName} from "../../lib/getBasePathFragmentForRelationshipName"
import {performApiRequest} from "../../lib/performApiRequest"

When('the user requests all {string} relationships for {string}',
    async (relationshipName: string, startNodeLabel: string) => {
        const startNode: DbNode = world.recallNode(startNodeLabel).data
        const startNodeType = world.recallNode(startNodeLabel).nodeType
        const nodePath = getBasePathFragmentForNodeType(startNodeType)
        const relPath = getBasePathFragmentForRelationshipName(relationshipName)
        const path = `/${nodePath}/${startNode.properties.id}/${relPath}`

        const response = await performApiRequest(path, 'GET')
        world.rememberResponse(response)
    })
