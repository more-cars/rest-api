import {Given, world} from "@cucumber/cucumber"
import axios from "axios"
import type {BaseNode} from "../../../../src/db/types/BaseNode"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import {dasherize} from "inflection"

Given('there exists a {string} relationship between {string} and {string}',
    async (relationshipName: string, startNodeLabel: string, endNodeLabel: string) => {
        const startNode: BaseNode = world.recallNode(startNodeLabel).data
        const endNode = world.recallNode(endNodeLabel).data
        const nodePathFragment = getBasePathFragmentForNodeType(world.recallNode(startNodeLabel).nodeType)

        await axios
            .post(`${process.env.API_URL}/${nodePathFragment}/${startNode.id}/${dasherize(relationshipName)}/${endNode.id}`)
            .catch(error => {
                console.error(error)
            })
    })
