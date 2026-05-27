import {Given} from "@cucumber/cucumber"
import {NodeManager} from "../../lib/NodeManager"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {dasherize} from "inflection"
import {performApiRequest} from "../../lib/performApiRequest"

Given('there exists a {string} relationship between {string} and {string}',
    async (relationshipName: string, startNodeLabel: string, endNodeLabel: string) => {
        const startNode = NodeManager.getNodeByLabel(startNodeLabel)
        const endNode = NodeManager.getNodeByLabel(endNodeLabel)
        const nodePathFragment = getBasePathFragmentForNodeType(startNode.node_type)
        const path = `/${nodePathFragment}/${startNode.fields.id}/${dasherize(relationshipName)}/${endNode.fields.id}`

        await performApiRequest(path, 'POST')
    })
