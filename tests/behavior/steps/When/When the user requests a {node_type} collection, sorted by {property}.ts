import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import type {ControllerNodeType} from "../../../../src/controllers/types/ControllerNodeType"

When('the user requests a {string} collection, sorted by {string}',
    async (nodeType: string, sortByProperty: string) => {
        const path = getBasePathFragmentForNodeType(nodeType.toLowerCase() as ControllerNodeType)

        const response = await axios
            .get(`${process.env.API_URL}/${path}?sort_by_property=${sortByProperty}`)

        world.rememberResponse(response)
    })
