import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {seedNode} from "../../_toolbox/dbSeeding/seedNode"
import type {NodeType} from "../../_toolbox/NodeType"
import {getBasePathFragmentForNodeType} from "../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import type {BaseNode} from "../../../src/db/types/BaseNode"
import {getBasePathFragmentForRelationship} from "../../_toolbox/dbSeeding/getBasePathFragmentForRelationship"

When('the user connects a(n) {string} to a(n) {string}',
    async (startNodeType: string, endNodeType: string) => {
        const nodePathFragment = getBasePathFragmentForNodeType(startNodeType.toLowerCase() as NodeType)
        const startNode: BaseNode = await seedNode(startNodeType.toLowerCase() as NodeType)
        const relationshipName = getBasePathFragmentForRelationship(startNodeType.toLowerCase() as NodeType, endNodeType.toLowerCase() as NodeType)
        const endNode: BaseNode = await seedNode(endNodeType.toLowerCase() as NodeType)

        const response = await axios
            .post(`${process.env.API_URL}/${nodePathFragment}/${startNode.id}/${relationshipName}/${endNode.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
