import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import {getExhaustiveFakeInputDataForDbNode} from "../../../_toolbox/fixtures/nodes/getExhaustiveFakeInputDataForDbNode"
import type {ControllerNodeType} from "../../../../src/controllers/nodes/types/ControllerNodeType"
import type {DbNodeType} from "../../../../src/db/types/DbNodeType"
import {dasherize, pluralize} from "inflection"

When('the user creates a {string} {string}',
    async (nodeType: string, label: string) => {
        const path = getBasePathFragmentForNodeType(nodeType as ControllerNodeType)
        const data = getExhaustiveFakeInputDataForDbNode(dasherize(pluralize(nodeType.toLowerCase())) as DbNodeType)

        const response = await axios
            .post(`${process.env.API_URL}/${path}`, data)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
        world.rememberNode(response?.data.data, label, nodeType.toLowerCase())
    })
