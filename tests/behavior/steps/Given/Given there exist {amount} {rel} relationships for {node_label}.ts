import {Given, world} from "@cucumber/cucumber"
import axios from "axios"
import {dasherize} from "inflection"
import type {DbNode} from "../../../../src/db/types/DbNode"
import {getRelationshipSpecification} from "../../../../src/db/relationships/getRelationshipSpecification"
import {constantCase} from "change-case"
import {RelationshipType} from "../../../../src/db/types/RelationshipType"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import {seedNode} from "../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../src/db/types/DbNodeType"

Given('there exist {int} {string} relationships for {string}',
    async (amount: number, relationshipName: string, startNodeLabel: string) => {
        const startNode: DbNode = world.recallNode(startNodeLabel).data
        const relationship = getRelationshipSpecification(constantCase(startNode.node_type + '_' + relationshipName) as RelationshipType)
        const endNodeType = relationship.endNodeType
        const nodePathFragment = getBasePathFragmentForNodeType(world.recallNode(startNodeLabel).nodeType)

        for (let i = 0; i < amount; i++) {
            const endNode = await seedNode(endNodeType || DbNodeType.Brand)

            await axios
                .post(`${process.env.API_URL}/${nodePathFragment}/${startNode.properties.id}/${dasherize(relationshipName)}/${endNode.properties.id}`)
                .catch(error => {
                    console.error(error)
                })
        }
    })
