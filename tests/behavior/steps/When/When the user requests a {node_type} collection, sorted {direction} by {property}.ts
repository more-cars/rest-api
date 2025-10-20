import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import type {NodeTypeEnum} from "../../../../src/controllers/nodes/types/NodeTypeEnum"

When('the user requests a {string} collection, sorted {string} by {string}',
    async (nodeType: string, sortDirection: string, sortByProperty: string) => {
        const path = getBasePathFragmentForNodeType(nodeType.toLowerCase() as NodeTypeEnum)

        const response = await axios
            .get(`${process.env.API_URL}/${path}?sort_by_property=${sortByProperty}&sort_direction=${sortDirection}`)

        world.rememberResponse(response)
    })
