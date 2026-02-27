import {Given, world} from "@cucumber/cucumber"
import axios from "axios"
import type {DbNode} from "../../../../src/db/types/DbNode"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import type {ControllerNodeType} from "../../../../src/controllers/types/ControllerNodeType"
import {getBasePathFragmentForRelationship} from "../../../_toolbox/dbSeeding/getBasePathFragmentForRelationship"

Given('there exists a(n) relationship {string} between {string} {string} and {string} {string}',
    async (relationshipLabel: string, startNodeType: string, startNodeLabel: string, endNodeType: string, endNodeLabel: string) => {
        const nodePathFragment = getBasePathFragmentForNodeType(startNodeType.toLowerCase() as ControllerNodeType)
        const startNode: DbNode = world.recallNode(startNodeLabel).data
        const relationshipName = getBasePathFragmentForRelationship(startNodeType.toLowerCase() as ControllerNodeType, endNodeType.toLowerCase() as ControllerNodeType)
        const endNode = world.recallNode(endNodeLabel).data

        const response = await axios
            .post(`${process.env.API_URL}/${nodePathFragment}/${startNode.properties.id}/${relationshipName}/${endNode.properties.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberRelationship(response?.data.data, relationshipLabel)
    })
