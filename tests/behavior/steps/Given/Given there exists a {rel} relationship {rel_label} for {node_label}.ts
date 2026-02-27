import {Given, world} from "@cucumber/cucumber"
import axios from "axios"
import {dasherize} from "inflection"
import type {DbNode} from "../../../../src/db/types/DbNode"
import {convertStringToRelationshipType} from "../../lib/convertStringToRelationshipType"
import {getRelationshipTypeSpecification} from "../../../../src/specification/getRelationshipTypeSpecification"
import {seedNode} from "../../../_toolbox/dbSeeding/seedNode"
import {mapNodeTypeToDbNodeType} from "../../../../src/specification/mapNodeTypeToDbNodeType"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"

Given('there exists a {string} relationship {string} for {string}',
    async (relationshipName: string, relationshipLabel: string, startNodeLabel: string) => {
        const startNode: DbNode = world.recallNode(startNodeLabel).data
        const relationshipType = convertStringToRelationshipType(relationshipName, startNode.node_type)
        const relationshipSpecification = getRelationshipTypeSpecification(relationshipType)
        const endNode = await seedNode(mapNodeTypeToDbNodeType(relationshipSpecification.endNodeType))
        const nodePathFragment = getBasePathFragmentForNodeType(world.recallNode(startNodeLabel).nodeType)

        const response = await axios
            .post(`${process.env.API_URL}/${nodePathFragment}/${startNode.properties.id}/${dasherize(relationshipName)}/${endNode.properties.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberRelationship(response?.data.data, relationshipLabel)
    })
