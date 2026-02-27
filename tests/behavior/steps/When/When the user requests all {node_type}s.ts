import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"

/**
 * @deprecated: use "the user requests a {string} collection" step instead
 */
When('the user requests all {string}s',
    async (nodeType: string) => {
        const path = getBasePathFragmentForNodeType(nodeType)

        const response = await axios
            .get(`${process.env.API_URL}/${path}`)

        world.rememberResponse(response)
    })
