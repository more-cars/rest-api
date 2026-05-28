import {When} from "@cucumber/cucumber"
import {dasherize} from "inflection"
import {NodeManager} from "../../lib/NodeManager"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {performApiRequest} from "../../lib/performApiRequest"

When('the user deletes the {string} relationship between {string} and {string}',
    async (relationshipName: string, startNodeLabel: string, endNodeLabel: string) => {
        const startNode = NodeManager.getNodeByLabel(startNodeLabel)
        const endNode = NodeManager.getNodeByLabel(endNodeLabel)
        const nodePath = getBasePathFragmentForNodeType(startNode.node_type)
        const path = `/${nodePath}/${startNode.fields.id}/relationships/${dasherize(relationshipName)}`
        const data = {
            data: {
                type: endNode.node_type,
                id: endNode.fields.id,
            },
        }

        await performApiRequest(path, 'DELETE', data)
    })
