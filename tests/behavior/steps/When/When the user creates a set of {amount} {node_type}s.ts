import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import type {ControllerNodeType} from "../../../../src/controllers/nodes/types/ControllerNodeType"
import {getExhaustiveFakeInputDataForDbNode} from "../../../_toolbox/fixtures/nodes/getExhaustiveFakeInputDataForDbNode"
import {dasherize, pluralize} from "inflection"

When('the user creates a set of {int} {string}s',
    async (amount: number, nodeType: string) => {
        const nodes = []

        for (let i = 0; i < amount; i++) {
            const path = getBasePathFragmentForNodeType(dasherize(pluralize(nodeType.toLowerCase())) as ControllerNodeType)
            const data = getExhaustiveFakeInputDataForDbNode(dasherize(pluralize(nodeType.toLowerCase())) as ControllerNodeType)

            const response = await axios
                .post(`${process.env.API_URL}/${path}`, data)
                .catch(error => {
                    console.error(error)
                })

            nodes.push({
                data: response?.data.data
            })
        }

        const response = {
            data: { // axios payload
                data: nodes // mc payload
            }
        }

        world.rememberResponse(response)
    })
