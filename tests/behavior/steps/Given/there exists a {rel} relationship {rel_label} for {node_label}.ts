import {Given} from "@cucumber/cucumber"
import {dasherize} from "inflection"
import {NodeManager} from "../../lib/NodeManager"
import {convertStringToRelationshipType} from "../../lib/convertStringToRelationshipType"
import {getRelationshipTypeSpecification} from "../../../../src/specification/getRelationshipTypeSpecification"
import {NodeType} from "../../../../src/specification/NodeType"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {performApiRequest} from "../../lib/performApiRequest"
import {RelationshipManager} from "../../lib/RelationshipManager"

Given('there exists a {string} relationship {string} for {string}',
    async (relationshipName: string, relationshipLabel: string, startNodeLabel: string) => {
        const startNode = NodeManager.getNodeByLabel(startNodeLabel)
        const relationshipType = convertStringToRelationshipType(relationshipName, startNode.node_type)
        const relationshipSpecification = getRelationshipTypeSpecification(relationshipType)
        const endNode = await NodeManager.createNode(relationshipSpecification.endNodeType || NodeType.CarModel, '')
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
