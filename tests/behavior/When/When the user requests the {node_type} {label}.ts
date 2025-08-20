import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import type {NodeType} from "../../_toolbox/NodeType"

When('the user requests the {string} {string}',
    async (nodeType: string, label: string) => {
        const node = world.recallNode(label)
        const path = getBasePathFragmentForNodeType(nodeType.toLowerCase() as NodeType)

        const response = await axios
            .get(`${process.env.API_URL}/${path}/${node.id}`)

        world.rememberResponse(response)
    })
