import {Given, world} from "@cucumber/cucumber"
import {dasherize} from "inflection"
import {NodeManager} from "../../lib/NodeManager"
import {convertStringToRelationshipType} from "../../lib/convertStringToRelationshipType"
import {getRelationshipTypeSpecification} from "../../../../src/specification/getRelationshipTypeSpecification"
import {seedNode} from "../../../_toolbox/dbSeeding/seedNode"
import {mapNodeTypeToDbNodeType} from "../../../../src/specification/mapNodeTypeToDbNodeType"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {performApiRequest} from "../../lib/performApiRequest"

Given('there exists a {string} relationship {string} for {string}',
    async (relationshipName: string, relationshipLabel: string, startNodeLabel: string) => {
        const startNode = NodeManager.getNodeByLabel(startNodeLabel)
        const relationshipType = convertStringToRelationshipType(relationshipName, startNode.node_type)
        const relationshipSpecification = getRelationshipTypeSpecification(relationshipType)
        const endNode = await seedNode(mapNodeTypeToDbNodeType(relationshipSpecification.endNodeType))
        const nodePathFragment = getBasePathFragmentForNodeType(startNode.node_type)
        const path = `/${nodePathFragment}/${startNode.fields.id}/${dasherize(relationshipName)}/${endNode.properties.id}`

        const response = await performApiRequest(path, 'POST')
        world.rememberRelationship(response.body.data, relationshipLabel)
    })
