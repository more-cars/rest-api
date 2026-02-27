import {Given, world} from "@cucumber/cucumber"
import axios from "axios"
import type {DbNode} from "../../../../src/db/types/DbNode"
import {seedNode} from "../../../_toolbox/dbSeeding/seedNode"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {dasherize} from "inflection"
import {getRelationshipTypeSpecification} from "../../../../src/specification/getRelationshipTypeSpecification"
import {constantCase} from "change-case"
import {RelationshipType} from "../../../../src/db/types/RelationshipType"

Given('there exists a {string} relationship {string} for {string}',
    async (relationshipName: string, relationshipLabel: string, startNodeLabel: string) => {
        const startNode: DbNode = world.recallNode(startNodeLabel).data
        const startNodeType = world.recallNode(startNodeLabel).nodeType
        const relationship = getRelationshipTypeSpecification(constantCase(startNodeType + '_' + relationshipName) as RelationshipType)
        const endNode = await seedNode(relationship.endNodeType)
        const nodePathFragment = getBasePathFragmentForNodeType(world.recallNode(startNodeLabel).nodeType)

        const response = await axios
            .post(`${process.env.API_URL}/${nodePathFragment}/${startNode.properties.id}/${dasherize(relationshipName)}/${endNode.properties.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberRelationship(response?.data.data, relationshipLabel)
    })
