import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"

When('the user requests page {int} of the {string} collection',
    async (page: number, nodeType: string) => {
        const path = getBasePathFragmentForNodeType(nodeType)

        const response = await axios
            .get(`${process.env.API_URL}/${path}?page=${page}`)

        world.rememberResponse(response)
    })
