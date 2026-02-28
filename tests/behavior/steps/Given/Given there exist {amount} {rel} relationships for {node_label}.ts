import {Given, world} from "@cucumber/cucumber"
import {dasherize} from "inflection"
import type {DbNode} from "../../../../src/db/types/DbNode"
import {convertStringToRelationshipType} from "../../lib/convertStringToRelationshipType"
import {getRelationshipTypeSpecification} from "../../../../src/specification/getRelationshipTypeSpecification"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {seedNode} from "../../../_toolbox/dbSeeding/seedNode"
import {mapNodeTypeToDbNodeType} from "../../../../src/specification/mapNodeTypeToDbNodeType"
import {performApiRequest} from "../../lib/performApiRequest"

Given('there exist {int} {string} relationships for {string}',
    async (amount: number, relationshipName: string, startNodeLabel: string) => {
        const startNode: DbNode = world.recallNode(startNodeLabel).data
        const relationshipType = convertStringToRelationshipType(relationshipName, startNode.node_type)
        const relationshipSpecification = getRelationshipTypeSpecification(relationshipType)
        const endNodeType = relationshipSpecification.endNodeType
        const nodePath = getBasePathFragmentForNodeType(world.recallNode(startNodeLabel).nodeType)

        for (let i = 0; i < amount; i++) {
            const endNode = await seedNode(mapNodeTypeToDbNodeType(endNodeType))
            const path = `/${nodePath}/${startNode.properties.id}/${dasherize(relationshipName)}/${endNode.properties.id}`

            await performApiRequest(path, 'POST')
        }
    })
