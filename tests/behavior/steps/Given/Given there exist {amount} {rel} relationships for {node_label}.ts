import {Given, world} from "@cucumber/cucumber"
import type {NodeTypeEnum} from "../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {BaseNode} from "../../../../src/db/types/BaseNode"
import {getTargetNodeTypeForRelationship} from "../../../_toolbox/dbSeeding/getTargetNodeTypeForRelationship"
import {seedNode} from "../../../_toolbox/dbSeeding/seedNode"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import axios from "axios"
import {dasherize} from "inflection"

Given('there exist {int} {string} relationships for {string}',
    async (amount: number, relationshipName: string, startNodeLabel: string) => {
        const startNode: BaseNode = world.recallNode(startNodeLabel).data
        const startNodeType: NodeTypeEnum = world.recallNode(startNodeLabel).nodeType
        const endNodeType = getTargetNodeTypeForRelationship(startNodeType, relationshipName)
        const nodePathFragment = getBasePathFragmentForNodeType(world.recallNode(startNodeLabel).nodeType)

        for (let i = 0; i < amount; i++) {
            const endNode = await seedNode(endNodeType)

            await axios
                .post(`${process.env.API_URL}/${nodePathFragment}/${startNode.id}/${dasherize(relationshipName)}/${endNode.id}`)
                .catch(error => {
                    console.error(error)
                })
        }
    })
