import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import type {NodeType} from "../../_toolbox/NodeType"

When('the user requests all {string}s',
    async (nodeType: string) => {
        const path = await getBasePathFragmentForNodeType(nodeType.toLowerCase() as NodeType)

        const response = await axios
            .get(`${process.env.API_URL}/${path}`)

        world.rememberResponse(response)
    })
