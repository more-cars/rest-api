import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import {ControllerNodeType} from "../../../../src/controllers/nodes/types/ControllerNodeType"
import {dasherize, pluralize} from "inflection"

When('the user requests a {string} collection, sorted {string} by {string}',
    async (nodeTypeName: string, sortDirection: string, sortByProperty: string) => {
        const nodeType = dasherize(pluralize(nodeTypeName.toLowerCase())) as ControllerNodeType
        const path = getBasePathFragmentForNodeType(nodeType)

        if (nodeType === ControllerNodeType.SessionResult) {
            sortByProperty = 'position'
        } else if (nodeType === ControllerNodeType.LapTime) {
            sortByProperty = 'time'
        }

        const response = await axios
            .get(`${process.env.API_URL}/${path}?sort_by_property=${sortByProperty}&sort_direction=${sortDirection}`)

        world.rememberResponse(response)
    })
