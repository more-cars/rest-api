import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import type {ControllerNodeType} from "../../../../src/controllers/nodes/types/ControllerNodeType"
import type {DbNode} from "../../../../src/db/types/DbNode"
import {getBasePathFragmentForRelationshipName} from "../../../_toolbox/dbSeeding/getBasePathFragmentForRelationshipName"

When('the user requests all {string} relationships for {string}',
    async (relationshipName: string, startNodeLabel: string) => {
        const startNode: DbNode = world.recallNode(startNodeLabel).data
        const startNodeType: ControllerNodeType = world.recallNode(startNodeLabel).nodeType
        const nodePathFragment = getBasePathFragmentForNodeType(startNodeType)
        const relPathFragment = getBasePathFragmentForRelationshipName(relationshipName)

        const response = await axios
            .get(`${process.env.API_URL}/${nodePathFragment}/${startNode.id}/${relPathFragment}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
