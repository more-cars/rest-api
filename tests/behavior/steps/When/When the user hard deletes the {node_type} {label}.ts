import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import type {DbNode} from "../../../../src/db/types/DbNode"

When('the user hard-deletes the {string} {string}',
    async (nodeType: string, label: string) => {
        const node: DbNode = world.recallNode(label).data
        const path = getBasePathFragmentForNodeType(nodeType)

        const response = await axios
            .delete(`${process.env.API_URL}/${path}/${node.properties.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
