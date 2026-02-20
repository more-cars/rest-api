import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import {FakeNodeInput} from "../../../_toolbox/fixtures/nodes/FakeNodeInput"
import type {ControllerNodeType} from "../../../../src/controllers/nodes/types/ControllerNodeType"

When('the user creates a {string} {string}',
    async (nodeType: string, label: string) => {
        const path = getBasePathFragmentForNodeType(nodeType.toLowerCase() as ControllerNodeType)
        const data = FakeNodeInput(nodeType.toLowerCase() as ControllerNodeType)

        const response = await axios
            .post(`${process.env.API_URL}/${path}`, data)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
        world.rememberNode(response?.data.data, label, nodeType.toLowerCase())
    })
