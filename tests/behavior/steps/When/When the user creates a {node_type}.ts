import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {dasherize, pluralize} from "inflection"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import type {ControllerNodeType} from "../../../../src/controllers/types/ControllerNodeType"
import type {DbNodeType} from "../../../../src/db/types/DbNodeType"
import {getExhaustiveFakeInputDataForDbNode} from "../../../_toolbox/fixtures/nodes/getExhaustiveFakeInputDataForDbNode"

When('the user creates a(n) {string}',
    async (nodeType: string) => {
        const path = getBasePathFragmentForNodeType(nodeType as ControllerNodeType)
        const data = getExhaustiveFakeInputDataForDbNode(dasherize(pluralize(nodeType.toLowerCase())) as DbNodeType)

        const response = await axios
            .post(`${process.env.API_URL}/${path}`, data)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
