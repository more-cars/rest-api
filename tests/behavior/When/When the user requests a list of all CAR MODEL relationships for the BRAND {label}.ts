import {When} from "@cucumber/cucumber"
import axios from "axios"
import {BrandNode} from "../../../src/models/brands/types/BrandNode"

When('the user requests a list of all CAR MODEL relationships for the BRAND {string}',
    async function (label: string) {
        const brandNode: BrandNode = this.brand[label]

        this.latestResponse = await axios
            .get(`${process.env.API_URL}/brands/${brandNode.id}/has-car-model`)
            .catch(error => {
                console.error(error)
            })
    })
