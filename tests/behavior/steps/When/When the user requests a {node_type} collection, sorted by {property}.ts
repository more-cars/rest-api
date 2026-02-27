import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"

When('the user requests a {string} collection, sorted by {string}',
    async (nodeType: string, sortByProperty: string) => {
        const path = getBasePathFragmentForNodeType(nodeType)

        const response = await axios
            .get(`${process.env.API_URL}/${path}?sort_by_property=${sortByProperty}`)

        world.rememberResponse(response)
    })
