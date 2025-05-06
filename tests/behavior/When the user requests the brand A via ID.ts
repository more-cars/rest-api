import {When} from "@cucumber/cucumber"
import axios from "axios"
import {BrandNode} from "../../src/types/BrandNode"

When('the user requests the brand A via ID', async function () {
    const brandA: BrandNode = this.brandA
    const id = brandA.id

    this.latestResponse = await axios
        .get(`${process.env.API_URL}/brands/${id}`)
})
