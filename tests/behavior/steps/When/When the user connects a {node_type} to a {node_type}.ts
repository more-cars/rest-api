import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {seedNode} from "../../../_toolbox/dbSeeding/seedNode"
import type {ControllerNodeType} from "../../../../src/controllers/nodes/types/ControllerNodeType"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import {getBasePathFragmentForRelationship} from "../../../_toolbox/dbSeeding/getBasePathFragmentForRelationship"

When('the user connects a(n) {string} to a(n) {string}',
    async (startNodeType: string, endNodeType: string) => {
        const nodePathFragment = getBasePathFragmentForNodeType(startNodeType.toLowerCase() as ControllerNodeType)
        const startNode = await seedNode(startNodeType.toLowerCase() as ControllerNodeType)
        const relationshipName = getBasePathFragmentForRelationship(startNodeType.toLowerCase() as ControllerNodeType, endNodeType.toLowerCase() as ControllerNodeType)
        const endNode = await seedNode(endNodeType.toLowerCase() as ControllerNodeType)

        const response = await axios
            .post(`${process.env.API_URL}/${nodePathFragment}/${startNode.id}/${relationshipName}/${endNode.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
