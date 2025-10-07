import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import type {NodeType} from "../../../_toolbox/NodeType"

When('the user requests a {string} collection, filtered by {string} {string}',
    async (nodeType: string, filterByProperty: string, filterValue: string) => {
        const path = getBasePathFragmentForNodeType(nodeType.toLowerCase() as NodeType)

        const response = await axios
            .get(`${process.env.API_URL}/${path}?filter_by_property=${filterByProperty}&filter_value=${filterValue}`)

        world.rememberResponse(response)
    })
