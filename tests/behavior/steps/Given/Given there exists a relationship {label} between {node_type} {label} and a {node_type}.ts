import {Given, world} from "@cucumber/cucumber"
import axios from "axios"
import type {BaseNode} from "../../../../src/db/types/BaseNode"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import type {NodeTypeEnum} from "../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedNode} from "../../../_toolbox/dbSeeding/seedNode"
import {getBasePathFragmentForRelationship} from "../../../_toolbox/dbSeeding/getBasePathFragmentForRelationship"

Given('there exists a(n) relationship {string} between {string} {string} and a(n) {string}',
    async (relationshipLabel: string, startNodeType: string, startNodeLabel: string, endNodeType: string) => {
        const nodePathFragment = getBasePathFragmentForNodeType(startNodeType.toLowerCase() as NodeTypeEnum)
        const startNode: BaseNode = world.recallNode(startNodeLabel).data
        const relationshipName = getBasePathFragmentForRelationship(startNodeType.toLowerCase() as NodeTypeEnum, endNodeType.toLowerCase() as NodeTypeEnum)
        const endNode = await seedNode(endNodeType.toLowerCase() as NodeTypeEnum)

        const response = await axios
            .post(`${process.env.API_URL}/${nodePathFragment}/${startNode.id}/${relationshipName}/${endNode.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberRelationship(response?.data.data, relationshipLabel)
    })
