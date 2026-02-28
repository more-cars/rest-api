import {When, world} from "@cucumber/cucumber"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {ControllerNodeType} from "../../../../src/controllers/types/ControllerNodeType"
import {dasherize, pluralize} from "inflection"
import {performApiRequest} from "../../lib/performApiRequest"

When('the user requests a {string} collection, sorted {string} by {string}',
    async (nodeTypeName: string, sortDirection: string, sortByProperty: string) => {
        // TODO this is a temporary workaround -> the Gherkin scenarios should not assume that every node type has a property "name"
        const nodeType = dasherize(pluralize(nodeTypeName.toLowerCase())) as ControllerNodeType
        if (nodeType === ControllerNodeType.SessionResult) {
            sortByProperty = 'position'
        } else if (nodeType === ControllerNodeType.LapTime) {
            sortByProperty = 'time'
        }

        const nodePath = getBasePathFragmentForNodeType(nodeTypeName)
        const path = `/${nodePath}?sort_by_property=${sortByProperty}&sort_direction=${sortDirection}`

        const response = await performApiRequest(path, 'GET')
        world.rememberResponse(response)
    })
