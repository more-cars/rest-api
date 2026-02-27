import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import type {DbNode} from "../../../../src/db/types/DbNode"
import type {ControllerNodeType} from "../../../../src/controllers/types/ControllerNodeType"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {getBasePathFragmentForRelationshipName} from "../../lib/getBasePathFragmentForRelationshipName"

When('the user requests all {string} relationships for {string}',
    async (relationshipName: string, startNodeLabel: string) => {
        const startNode: DbNode = world.recallNode(startNodeLabel).data
        const startNodeType: ControllerNodeType = world.recallNode(startNodeLabel).nodeType
        const nodePathFragment = getBasePathFragmentForNodeType(startNodeType)
        const relPathFragment = getBasePathFragmentForRelationshipName(relationshipName)

        const response = await axios
            .get(`${process.env.API_URL}/${nodePathFragment}/${startNode.properties.id}/${relPathFragment}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
