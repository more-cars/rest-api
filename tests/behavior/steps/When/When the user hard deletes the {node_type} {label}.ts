import {When, world} from "@cucumber/cucumber"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import type {DbNode} from "../../../../src/db/types/DbNode"
import {performApiRequest} from "../../lib/performApiRequest"

When('the user hard-deletes the {string} {string}',
    async (nodeType: string, label: string) => {
        const node: DbNode = world.recallNode(label).data
        const nodePath = getBasePathFragmentForNodeType(nodeType)
        const path = `/${nodePath}/${node.properties.id}`

        const response = await performApiRequest(path, 'DELETE')
        world.rememberResponse(response)
    })
