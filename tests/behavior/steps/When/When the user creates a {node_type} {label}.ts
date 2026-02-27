import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {getFakeNode} from "../../../_toolbox/fixtures/nodes/getFakeNode"
import {convertStringToNodeType} from "../../lib/convertStringToNodeType"

When('the user creates a {string} {string}',
    async (nodeType: string, label: string) => {
        const path = getBasePathFragmentForNodeType(nodeType)
        const data = getFakeNode(convertStringToNodeType(nodeType)).dbInput

        const response = await axios
            .post(`${process.env.API_URL}/${path}`, data)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
        world.rememberNode(response?.data.data, label, nodeType.toLowerCase())
    })
