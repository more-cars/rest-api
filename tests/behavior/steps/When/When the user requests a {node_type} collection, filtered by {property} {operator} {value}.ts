import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import type {NodeTypeEnum} from "../../../../src/controllers/nodes/types/NodeTypeEnum"

When('the user requests a {string} collection, filtered by {string} {string} {string}',
    async (nodeType: string, filterByProperty: string, filterOperator: string, filterValue: string) => {
        const path = getBasePathFragmentForNodeType(nodeType.toLowerCase() as NodeTypeEnum)

        const response = await axios
            .get(`${process.env.API_URL}/${path}?filter_by_property=${filterByProperty}&filter_value=${filterValue}&filter_operator=${filterOperator}`)

        world.rememberResponse(response)
    })
