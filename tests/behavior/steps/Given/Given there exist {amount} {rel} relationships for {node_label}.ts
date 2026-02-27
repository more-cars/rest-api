import {Given, world} from "@cucumber/cucumber"
import axios from "axios"
import {dasherize} from "inflection"
import type {DbNode} from "../../../../src/db/types/DbNode"
import {getRelationshipTypeSpecification} from "../../../../src/specification/getRelationshipTypeSpecification"
import {pascalCase} from "change-case"
import type {RelationshipType} from "../../../../src/specification/RelationshipType"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {seedNode} from "../../../_toolbox/dbSeeding/seedNode"
import {mapNodeTypeToDbNodeType} from "../../../../src/specification/mapNodeTypeToDbNodeType"

Given('there exist {int} {string} relationships for {string}',
    async (amount: number, relationshipName: string, startNodeLabel: string) => {
        const startNode: DbNode = world.recallNode(startNodeLabel).data
        const relationship = getRelationshipTypeSpecification(pascalCase(startNode.node_type + relationshipName) as RelationshipType)
        const endNodeType = relationship.endNodeType
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
