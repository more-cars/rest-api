import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import FakeBrand from "../../_toolbox/fixtures/nodes/FakeBrand"

When('the user creates a BRAND {string}',
    async (label: string) => {
        const data = FakeBrand

        const response = await axios
            .post(`${process.env.API_URL}/brands`, data)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
        world.rememberNode(response?.data, label)
    })
