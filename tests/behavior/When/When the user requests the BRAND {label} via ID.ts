import {When} from "@cucumber/cucumber"
import axios from "axios"
import {BrandNode} from "../../../src/models/brands/types/BrandNode"

When('the user requests the BRAND {string} via ID',
    async function (label: string) {
        const brand: BrandNode = this.brand[label]

        this.latestResponse = await axios
            .get(`${process.env.API_URL}/brands/${brand.id}`)
    })
