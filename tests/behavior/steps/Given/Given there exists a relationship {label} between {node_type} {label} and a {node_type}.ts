import {Given, world} from "@cucumber/cucumber"
import axios from "axios"
import type {DbNode} from "../../../../src/db/types/DbNode"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import type {ControllerNodeType} from "../../../../src/controllers/types/ControllerNodeType"
import {getBasePathFragmentForRelationship} from "../../../_toolbox/dbSeeding/getBasePathFragmentForRelationship"
import {seedNode} from "../../../_toolbox/dbSeeding/seedNode"
import {pascalCase} from "change-case"
import type {DbNodeType} from "../../../../src/db/types/DbNodeType"

Given('there exists a(n) relationship {string} between {string} {string} and a(n) {string}',
    async (relationshipLabel: string, startNodeType: string, startNodeLabel: string, endNodeType: string) => {
        const nodePathFragment = getBasePathFragmentForNodeType(startNodeType)
        const startNode: DbNode = world.recallNode(startNodeLabel).data
        const relationshipName = getBasePathFragmentForRelationship(startNodeType.toLowerCase() as ControllerNodeType, endNodeType.toLowerCase() as ControllerNodeType)
        const endNode = await seedNode(pascalCase(endNodeType) as DbNodeType)

        const response = await axios
            .post(`${process.env.API_URL}/${nodePathFragment}/${startNode.properties.id}/${relationshipName}/${endNode.properties.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberRelationship(response?.data.data, relationshipLabel)
    })
