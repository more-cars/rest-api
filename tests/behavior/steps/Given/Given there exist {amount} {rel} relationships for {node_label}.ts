import {Given, world} from "@cucumber/cucumber"
import type {ControllerNodeType} from "../../../../src/controllers/nodes/types/ControllerNodeType"
import type {DbNode} from "../../../../src/db/types/DbNode"
import {getTargetNodeTypeForRelationship} from "../../../_toolbox/getTargetNodeTypeForRelationship"
import {seedNode} from "../../../_toolbox/dbSeeding/seedNode"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import axios from "axios"
import {dasherize} from "inflection"

Given('there exist {int} {string} relationships for {string}',
    async (amount: number, relationshipName: string, startNodeLabel: string) => {
        const startNode: DbNode = world.recallNode(startNodeLabel).data
        const startNodeType: ControllerNodeType = world.recallNode(startNodeLabel).nodeType
        const endNodeType = getTargetNodeTypeForRelationship(startNodeType, relationshipName)
        const nodePathFragment = getBasePathFragmentForNodeType(world.recallNode(startNodeLabel).nodeType)

        for (let i = 0; i < amount; i++) {
            const endNode = await seedNode(endNodeType)

            await axios
                .post(`${process.env.API_URL}/${nodePathFragment}/${startNode.properties.id}/${dasherize(relationshipName)}/${endNode.id}`)
                .catch(error => {
                    console.error(error)
                })
        }
    })
