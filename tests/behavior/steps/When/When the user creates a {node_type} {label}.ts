import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {titleize} from "inflection"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import type {ControllerNodeType} from "../../../../src/controllers/types/ControllerNodeType"
import {getFakeNode} from "../../../_toolbox/fixtures/nodes/getFakeNode"
import type {NodeType} from "../../../../src/specification/NodeType"

When('the user creates a {string} {string}',
    async (nodeType: string, label: string) => {
        const path = getBasePathFragmentForNodeType(nodeType as ControllerNodeType)
        const data = getFakeNode(titleize(nodeType) as NodeType).dbInput

        const response = await axios
            .post(`${process.env.API_URL}/${path}`, data)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
        world.rememberNode(response?.data.data, label, nodeType.toLowerCase())
    })
