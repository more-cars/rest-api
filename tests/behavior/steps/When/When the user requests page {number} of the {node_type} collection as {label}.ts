import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"

When('the user requests page {int} of the {string} collection as {string}',
    async (page: number, nodeType: string, collectionLabel: string) => {
        const path = getBasePathFragmentForNodeType(nodeType)

        const response = await axios
            .get(`${process.env.API_URL}/${path}?page=${page}`)

        world.rememberNodeCollection(response.data, collectionLabel, nodeType.toLowerCase())
        world.rememberResponse(response)
    })
