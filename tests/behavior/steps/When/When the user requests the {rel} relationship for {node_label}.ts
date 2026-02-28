import {When, world} from "@cucumber/cucumber"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {getBasePathFragmentForRelationshipName} from "../../lib/getBasePathFragmentForRelationshipName"
import {performApiRequest} from "../../lib/performApiRequest"
import {NodeManager} from "../../lib/NodeManager"

When('the user requests the {string} relationship for {string}',
    async (relationshipName: string, startNodeLabel: string) => {
        const startNode = NodeManager.getNodeByLabel(startNodeLabel)
        const nodePath = getBasePathFragmentForNodeType(startNode.node_type)
        const relPath = getBasePathFragmentForRelationshipName(relationshipName)
        const path = `/${nodePath}/${startNode.fields.id}/${relPath}`

        const response = await performApiRequest(path, 'GET')
        world.rememberResponse(response)
    })
