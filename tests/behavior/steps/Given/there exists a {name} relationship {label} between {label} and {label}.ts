import {Given} from "@cucumber/cucumber"
import {NodeManager} from "../../lib/NodeManager"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {dasherize} from "inflection"
import {performApiRequest} from "../../lib/performApiRequest"
import {RelationshipManager} from "../../lib/RelationshipManager"

Given('there exists a {string} relationship {string} between {string} and {string}',
    async (relationshipName: string, relationshipLabel: string, startNodeLabel: string, endNodeLabel: string) => {
        const startNode = NodeManager.getNodeByLabel(startNodeLabel)
        const endNode = NodeManager.getNodeByLabel(endNodeLabel)
        const nodePathFragment = getBasePathFragmentForNodeType(startNode.node_type)
        const path = `/${nodePathFragment}/${startNode.fields.id}/relationships/${dasherize(relationshipName)}`
        const data = {
            data: {
                type: endNode.node_type,
                id: endNode.fields.id,
            },
        }

        await performApiRequest(path, 'POST', data)
        const {id, ...attributes} = endNode.fields

        RelationshipManager.cacheRelationship({
            links: {
                self: `/${nodePathFragment}/${startNode.fields.id}/${dasherize(relationshipName)}`
            },
            data: {
                type: endNode.node_type,
                id,
                attributes,
            },
        }, relationshipLabel)
    })
