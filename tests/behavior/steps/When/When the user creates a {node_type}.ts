import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import type {NodeTypeEnum} from "../../../../src/controllers/nodes/types/NodeTypeEnum"
import {FakeNodeInput} from "../../../_toolbox/fixtures/nodes/FakeNodeInput"

When('the user creates a(n) {string}',
    async (nodeType: string) => {
        const path = getBasePathFragmentForNodeType(nodeType.toLowerCase() as NodeTypeEnum)
        const data = FakeNodeInput(nodeType.toLowerCase() as NodeTypeEnum)

        const response = await axios
            .post(`${process.env.API_URL}/${path}`, data)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
