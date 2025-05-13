import {When} from "@cucumber/cucumber"
import axios from "axios"
import {BrandNode} from "../../src/types/BrandNode"

When('the user requests the brand {string} via ID', async function (label: string) {
    const brand: BrandNode = this.brand[label]

    this.latestResponse = await axios
        .get(`${process.env.API_URL}/brands/${brand.id}`)
})
