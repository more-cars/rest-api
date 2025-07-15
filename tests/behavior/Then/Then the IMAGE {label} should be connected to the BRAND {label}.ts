import {Then} from "@cucumber/cucumber"
import assert from "assert"
import axios from "axios"
import {BrandNode} from "../../../src/models/brands/types/BrandNode"
import {ImageNode} from "../../../src/models/images/types/ImageNode"

Then('the IMAGE {string} should be connected to the BRAND {string}',
    async function (imageLabel: string, brandLabel: string) {
        const image: ImageNode = this.image[imageLabel]
        const brand: BrandNode = this.brand[brandLabel]

        const response = await axios
            .get(`${process.env.API_URL}/brands/${brand.id}/has-image`)
            .catch(error => {
                console.error(error)
            })

        if (!response) {
            assert.fail('Failed to fetch the car model belongs to brand relationship.')
        }

        assert(response.data.image_id === image.id)
    })
