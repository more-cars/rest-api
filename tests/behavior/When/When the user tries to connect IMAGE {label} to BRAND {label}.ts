import {When} from "@cucumber/cucumber"
import axios from "axios"
import {BrandNode} from "../../../src/models/brands/types/BrandNode"
import {ImageNode} from "../../../src/models/images/types/ImageNode"

When('the user tries to connect IMAGE {string} to BRAND {string}',
    async function (imageLabel: string, brandLabel: string) {
        const brand: BrandNode = this.brand[brandLabel]
        const image: ImageNode = this.image[imageLabel]

        this.latestResponse = await axios
            .post(`${process.env.API_URL}/brands/${brand.id}/has-image/${image.id}`, null, {
                validateStatus: function (status) {
                    return status === 404 // treating the 404 as a "good" status code, so axios does not fail the request
                }
            })
            .catch(error => {
                console.error(error)
            })
    })
