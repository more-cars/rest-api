import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {dasherize, pluralize} from "inflection"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import type {ControllerNodeType} from "../../../../src/controllers/types/ControllerNodeType"
import {getFakeNode} from "../../../_toolbox/fixtures/nodes/getFakeNode"
import {convertStringToNodeType} from "../../lib/convertStringToNodeType"

When('the user creates a set of {int} {string}s',
    async (amount: number, nodeType: string) => {
        const nodes = []

        for (let i = 0; i < amount; i++) {
            const path = getBasePathFragmentForNodeType(dasherize(pluralize(nodeType.toLowerCase())) as ControllerNodeType)
            const data = getFakeNode(convertStringToNodeType(nodeType)).dbInput

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
