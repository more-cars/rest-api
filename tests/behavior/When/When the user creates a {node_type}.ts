import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import FakeBrand from "../../_toolbox/fixtures/nodes/FakeBrand"
import FakeCarModel from "../../_toolbox/fixtures/nodes/FakeCarModel"
import FakeImage from "../../_toolbox/fixtures/nodes/FakeImage"
import {getBasePathFragmentForNodeType} from "../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import type {NodeType} from "../../_toolbox/NodeType"

When('the user creates a(n) {string}',
    async (nodeType: string) => {
        let data: any = {}
        const path = getBasePathFragmentForNodeType(nodeType.toLowerCase() as NodeType)

        switch (nodeType.toLowerCase()) {
            case 'brand':
                data = FakeBrand
                break
            case 'car model':
                data = FakeCarModel
                break
            case 'image':
                data = FakeImage
                break
            default:
                return
        }

        const response = await axios
            .post(`${process.env.API_URL}/${path}`, data)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
