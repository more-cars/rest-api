import {When, world} from "@cucumber/cucumber"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {getFakeNode} from "../../../_toolbox/fixtures/nodes/getFakeNode"
import {convertStringToNodeType} from "../../lib/convertStringToNodeType"
import {performApiRequest} from "../../lib/performApiRequest"
import type {ApiResponse} from "../../lib/ApiResponse"

When('the user creates a set {string} of {int} {string}s',
    async (label: string, amount: number, nodeType: string) => {
        const nodeResponses: ApiResponse[] = []

        for (let i = 0; i < amount; i++) {
            const nodePath = getBasePathFragmentForNodeType(nodeType)
            const data = getFakeNode(convertStringToNodeType(nodeType)).dbInput
            const path = `/${nodePath}`

            const response = await performApiRequest(path, 'POST', data)
            nodeResponses.push(response)
        }

        world.rememberNodeCollection(nodeResponses.map(response => response.body.data), label)
    })
