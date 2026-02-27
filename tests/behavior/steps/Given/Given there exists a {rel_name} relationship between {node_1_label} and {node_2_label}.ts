import {Given, world} from "@cucumber/cucumber"
import axios from "axios"
import type {DbNode} from "../../../../src/db/types/DbNode"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {dasherize} from "inflection"

Given('there exists a {string} relationship between {string} and {string}',
    async (relationshipName: string, startNodeLabel: string, endNodeLabel: string) => {
        const startNode: DbNode = world.recallNode(startNodeLabel).data
        const endNode = world.recallNode(endNodeLabel).data
        const nodePathFragment = getBasePathFragmentForNodeType(world.recallNode(startNodeLabel).nodeType)

        await axios
            .post(`${process.env.API_URL}/${nodePathFragment}/${startNode.properties.id}/${dasherize(relationshipName)}/${endNode.properties.id}`)
            .catch(error => {
                console.error(error)
            })
    })
