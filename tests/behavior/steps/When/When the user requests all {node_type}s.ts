import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import type {NodeTypeEnum} from "../../../../src/controllers/nodes/types/NodeTypeEnum"

/**
 * @deprecated: use "the user requests a {string} collection" step instead
 */
When('the user requests all {string}s',
    async (nodeType: string) => {
        const path = getBasePathFragmentForNodeType(nodeType.toLowerCase() as NodeTypeEnum)

        const response = await axios
            .get(`${process.env.API_URL}/${path}`)

        world.rememberResponse(response)
    })
