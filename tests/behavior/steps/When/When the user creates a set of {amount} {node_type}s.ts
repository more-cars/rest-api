import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import type {ControllerNodeType} from "../../../../src/controllers/nodes/types/ControllerNodeType"
import {FakeNodeInput} from "../../../_toolbox/fixtures/nodes/FakeNodeInput"

When('the user creates a set of {int} {string}s',
    async (amount: number, nodeType: string) => {
        const nodes = []

        for (let i = 0; i < amount; i++) {
            const path = getBasePathFragmentForNodeType(nodeType.toLowerCase() as ControllerNodeType)
            const data = FakeNodeInput(nodeType.toLowerCase() as ControllerNodeType)

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
