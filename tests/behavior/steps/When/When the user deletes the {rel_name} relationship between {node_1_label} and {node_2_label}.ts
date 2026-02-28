import {When, world} from "@cucumber/cucumber"
import {NodeManager} from "../../lib/NodeManager"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {getBasePathFragmentForRelationshipName} from "../../lib/getBasePathFragmentForRelationshipName"
import {performApiRequest} from "../../lib/performApiRequest"

When('the user deletes the {string} relationship between {string} and {string}',
    async (relationshipName: string, startNodeLabel: string, endNodeLabel: string) => {
        const startNode = NodeManager.getNodeByLabel(startNodeLabel)
        const endNode = NodeManager.getNodeByLabel(endNodeLabel)
        const nodePath = getBasePathFragmentForNodeType(startNode.node_type)
        const relPath = getBasePathFragmentForRelationshipName(relationshipName)
        const path = `/${nodePath}/${startNode.fields.id}/${relPath}/${endNode.fields.id}`

        const response = await performApiRequest(path, 'DELETE')
        world.rememberResponse(response)
    })
