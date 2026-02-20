import {Given, world} from "@cucumber/cucumber"
import axios from "axios"
import type {DbNode} from "../../../../src/db/types/DbNode"
import {ControllerNodeType} from "../../../../src/controllers/nodes/types/ControllerNodeType"
import {getTargetNodeTypeForRelationship} from "../../../_toolbox/getTargetNodeTypeForRelationship"
import {seedNode} from "../../../_toolbox/dbSeeding/seedNode"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import {dasherize} from "inflection"

Given('there exists a {string} relationship {string} for {string}',
    async (relationshipName: string, relationshipLabel: string, startNodeLabel: string) => {
        const startNode: DbNode = world.recallNode(startNodeLabel).data
        const startNodeType: ControllerNodeType = world.recallNode(startNodeLabel).nodeType
        const endNodeType = getTargetNodeTypeForRelationship(startNodeType, relationshipName)
        const endNode = await seedNode(endNodeType)
        const nodePathFragment = getBasePathFragmentForNodeType(world.recallNode(startNodeLabel).nodeType)

        const response = await axios
            .post(`${process.env.API_URL}/${nodePathFragment}/${startNode.id}/${dasherize(relationshipName)}/${endNode.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberRelationship(response?.data.data, relationshipLabel)
    })
