import {Given, world} from "@cucumber/cucumber"
import axios from "axios"
import {dasherize} from "inflection"
import type {DbNode} from "../../../../src/db/types/DbNode"
import {convertStringToRelationshipType} from "../../lib/convertStringToRelationshipType"
import {getRelationshipTypeSpecification} from "../../../../src/specification/getRelationshipTypeSpecification"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {seedNode} from "../../../_toolbox/dbSeeding/seedNode"
import {mapNodeTypeToDbNodeType} from "../../../../src/specification/mapNodeTypeToDbNodeType"

Given('there exist {int} {string} relationships for {string}',
    async (amount: number, relationshipName: string, startNodeLabel: string) => {
        const startNode: DbNode = world.recallNode(startNodeLabel).data
        const relationshipType = convertStringToRelationshipType(relationshipName, startNode.node_type)
        const relationshipSpecification = getRelationshipTypeSpecification(relationshipType)
        const endNodeType = relationshipSpecification.endNodeType
        const nodePathFragment = getBasePathFragmentForNodeType(world.recallNode(startNodeLabel).nodeType)

        for (let i = 0; i < amount; i++) {
            const endNode = await seedNode(mapNodeTypeToDbNodeType(endNodeType))

            await axios
                .post(`${process.env.API_URL}/${nodePathFragment}/${startNode.properties.id}/${dasherize(relationshipName)}/${endNode.properties.id}`)
                .catch(error => {
                    console.error(error)
                })
        }
    })
