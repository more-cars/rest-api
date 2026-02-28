import {Given} from "@cucumber/cucumber"
import {dasherize} from "inflection"
import {NodeManager} from "../../lib/NodeManager"
import {convertStringToRelationshipType} from "../../lib/convertStringToRelationshipType"
import {getRelationshipTypeSpecification} from "../../../../src/specification/getRelationshipTypeSpecification"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {seedNode} from "../../../_toolbox/dbSeeding/seedNode"
import {mapNodeTypeToDbNodeType} from "../../../../src/specification/mapNodeTypeToDbNodeType"
import {performApiRequest} from "../../lib/performApiRequest"

Given('there exist {int} {string} relationships for {string}',
    async (amount: number, relationshipName: string, startNodeLabel: string) => {
        const startNode = NodeManager.getNodeByLabel(startNodeLabel)
        const relationshipType = convertStringToRelationshipType(relationshipName, startNode.node_type)
        const relationshipSpecification = getRelationshipTypeSpecification(relationshipType)
        const endNodeType = relationshipSpecification.endNodeType
        const nodePath = getBasePathFragmentForNodeType(startNode.node_type)

        for (let i = 0; i < amount; i++) {
            const endNode = await seedNode(mapNodeTypeToDbNodeType(endNodeType))
            const path = `/${nodePath}/${startNode.fields.id}/${dasherize(relationshipName)}/${endNode.properties.id}`

            await performApiRequest(path, 'POST')
        }
    })
