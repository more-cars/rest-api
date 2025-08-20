import {Given, world} from "@cucumber/cucumber"
import axios from "axios"
import type {BaseNode} from "../../../src/db/types/BaseNode"
import {getBasePathFragmentForNodeType} from "../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import type {NodeType} from "../../_toolbox/NodeType"
import {seedNode} from "../../_toolbox/dbSeeding/seedNode"
import {getBasePathFragmentForRelationship} from "../../_toolbox/dbSeeding/getBasePathFragmentForRelationship"

Given('there exists a(n) relationship {string} between {string} {string} and a(n) {string}',
    async (relationshipLabel: string, startNodeType: string, startNodeLabel: string, endNodeType: string) => {
        const nodePathFragment = getBasePathFragmentForNodeType(startNodeType.toLowerCase() as NodeType)
        const startNode: BaseNode = world.recallNode(startNodeLabel)
        const relationshipName = getBasePathFragmentForRelationship(startNodeType.toLowerCase() as NodeType, endNodeType.toLowerCase() as NodeType)
        const endNode = await seedNode(endNodeType.toLowerCase() as NodeType)

        const response = await axios
            .post(`${process.env.API_URL}/${nodePathFragment}/${startNode.id}/${relationshipName}/${endNode.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberRelationship(response?.data, relationshipLabel)
    })
