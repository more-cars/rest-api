import {Given} from "@cucumber/cucumber"
import {dasherize} from "inflection"
import {NodeManager} from "../../lib/NodeManager"
import {convertStringToRelationshipType} from "../../lib/convertStringToRelationshipType"
import {getRelationshipTypeSpecification} from "../../../../src/specification/getRelationshipTypeSpecification"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {performApiRequest} from "../../lib/performApiRequest"
import {RelationshipManager} from "../../lib/RelationshipManager"

Given('there exists a {string} relationship {string} for {string}',
    async (relationshipName: string, relationshipLabel: string, startNodeLabel: string) => {
        const startNode = NodeManager.getNodeByLabel(startNodeLabel)
        const relationshipType = convertStringToRelationshipType(relationshipName, startNode.node_type)
        const relationshipSpecification = getRelationshipTypeSpecification(relationshipType)
        const endNode = await NodeManager.createNode(relationshipSpecification.endNodeType, '')
        const nodePathFragment = getBasePathFragmentForNodeType(startNode.node_type)
        const path = `/${nodePathFragment}/${startNode.fields.id}/${dasherize(relationshipName)}/${endNode.fields.id}`

        const response = await performApiRequest(path, 'POST')
        RelationshipManager.cacheRelationship(response.body, relationshipLabel)
    })
