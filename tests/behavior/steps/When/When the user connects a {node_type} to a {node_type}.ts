import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {seedNode} from "../../../_toolbox/dbSeeding/seedNode"
import type {ControllerNodeType} from "../../../../src/controllers/types/ControllerNodeType"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {getBasePathFragmentForRelationship} from "../../../_toolbox/dbSeeding/getBasePathFragmentForRelationship"
import {pascalCase} from "change-case"
import type {DbNodeType} from "../../../../src/db/types/DbNodeType"

When('the user connects a(n) {string} to a(n) {string}',
    async (startNodeType: string, endNodeType: string) => {
        const nodePathFragment = getBasePathFragmentForNodeType(startNodeType.toLowerCase() as ControllerNodeType)
        const startNode = await seedNode(pascalCase(startNodeType) as DbNodeType)
        const relationshipName = getBasePathFragmentForRelationship(startNodeType.toLowerCase() as ControllerNodeType, endNodeType.toLowerCase() as ControllerNodeType)
        const endNode = await seedNode(pascalCase(endNodeType) as DbNodeType)

        const response = await axios
            .post(`${process.env.API_URL}/${nodePathFragment}/${startNode.properties.id}/${relationshipName}/${endNode.properties.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
