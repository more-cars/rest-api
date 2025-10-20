import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import type {NodeTypeEnum} from "../../../../src/controllers/nodes/types/NodeTypeEnum"

When('the user hard-deletes the {string} {string}',
    async (nodeType: string, label: string) => {
        const node = world.recallNode(label).data
        const path = getBasePathFragmentForNodeType(nodeType.toLowerCase() as NodeTypeEnum)

        const response = await axios
            .delete(`${process.env.API_URL}/${path}/${node.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
