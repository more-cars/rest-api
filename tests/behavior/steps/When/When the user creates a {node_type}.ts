import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import type {ControllerNodeType} from "../../../../src/controllers/types/ControllerNodeType"
import {getFakeNode} from "../../../_toolbox/fixtures/nodes/getFakeNode"
import {convertStringToNodeType} from "../../lib/convertStringToNodeType"

When('the user creates a(n) {string}',
    async (nodeType: string) => {
        const path = getBasePathFragmentForNodeType(nodeType as ControllerNodeType)
        const data = getFakeNode(convertStringToNodeType(nodeType)).dbInput

        const response = await axios
            .post(`${process.env.API_URL}/${path}`, data)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
