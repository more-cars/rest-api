import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import type {ControllerNodeType} from "../../../../src/controllers/types/ControllerNodeType"

When('the user requests page {string} of the {string} collection',
    async (page: string, nodeType: string) => {
        const path = getBasePathFragmentForNodeType(nodeType.toLowerCase() as ControllerNodeType)

        const response = await axios
            .get(`${process.env.API_URL}/${path}?page=${page}`)

        world.rememberResponse(response)
    })
