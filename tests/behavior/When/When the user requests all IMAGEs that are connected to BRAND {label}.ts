import {When} from "@cucumber/cucumber"
import axios from "axios"
import {BrandNode} from "../../../src/models/brands/types/BrandNode.ts"

When('the user requests all IMAGEs that are connected to BRAND {string}',
    async function (label: string) {
        const brand: BrandNode = this.brand[label]

        this.latestResponse = await axios
            .get(`${process.env.API_URL}/brands/${brand.id}/has-image`)
            .catch(error => {
                console.error(error)
            })
    })
