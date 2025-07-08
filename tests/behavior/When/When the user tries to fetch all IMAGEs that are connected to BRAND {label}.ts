import {When} from "@cucumber/cucumber"
import axios from "axios"
import {BrandNode} from "../../../src/models/brands/types/BrandNode"

When('the user tries to fetch all IMAGEs that are connected to BRAND {string}',
    async function (label: string) {
        const brand: BrandNode = this.brand[label]

        this.latestResponse = await axios
            .get(`${process.env.API_URL}/brands/${brand.id}/has-image`, {
                validateStatus: function (status) {
                    return status === 404 // treating 404 as a "good" status code, so axios does not fail the request
                }
            })
            .catch(error => {
                console.error(error)
            })
    })
