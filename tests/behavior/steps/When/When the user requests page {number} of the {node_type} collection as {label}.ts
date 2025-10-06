import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import type {NodeType} from "../../../_toolbox/NodeType"

When('the user requests page {int} of the {string} collection as {string}',
    async (page: number, nodeType: string, collectionLabel: string) => {
        const path = getBasePathFragmentForNodeType(nodeType.toLowerCase() as NodeType)

        const response = await axios
            .get(`${process.env.API_URL}/${path}?page=${page}`)

        world.rememberNodeCollection(response.data, collectionLabel, nodeType.toLowerCase())
        world.rememberResponse(response)
    })
