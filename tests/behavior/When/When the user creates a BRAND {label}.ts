import {When} from "@cucumber/cucumber"
import axios from "axios"
import FakeBrand from "../../_toolbox/fixtures/nodes/FakeBrand"

When('the user creates a BRAND {string}',
    async function (label: string) {
        const data = FakeBrand

        this.latestResponse = await axios
            .post(`${process.env.API_URL}/brands`, data)
            .catch(error => {
                console.error(error)
            })

        this.brand[label] = this.latestResponse.data
    })
