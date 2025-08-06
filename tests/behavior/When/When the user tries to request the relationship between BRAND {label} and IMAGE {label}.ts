import {When} from "@cucumber/cucumber"
import axios from "axios"
import type {ImageNode} from "../../../src/models/images/types/ImageNode"
import type {BrandNode} from "../../../src/models/brands/types/BrandNode"

When('the user tries to request the relationship between BRAND {string} and IMAGE {string}',
    async function (brandLabel: string, imageLabel: string) {
        const image: ImageNode = this.image[imageLabel]
        const brand: BrandNode = this.brand[brandLabel]

        this.latestResponse = await axios
            .get(`${process.env.API_URL}/brands/${brand.id}/has-image/${image.id}`, {
                validateStatus: function (status) {
                    return status === 404 // treating 404 as a "good" status code, so axios does not fail the request
                }
            })
            .catch(error => {
                console.error(error)
            })
    })
