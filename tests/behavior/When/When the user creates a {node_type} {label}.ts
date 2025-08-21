import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import {FakeNode} from "../../_toolbox/fixtures/nodes/FakeNode"
import type {NodeType} from "../../_toolbox/NodeType"

When('the user creates a {string} {string}',
    async (nodeType: string, label: string) => {
        const path = getBasePathFragmentForNodeType(nodeType.toLowerCase() as NodeType)
        const data = FakeNode(nodeType.toLowerCase() as NodeType)

        const response = await axios
            .post(`${process.env.API_URL}/${path}`, data)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
        world.rememberNode(response?.data, label)
    })
