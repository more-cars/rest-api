import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import axios from "axios"
import {BrandNode} from "../../../../src/models/brands/types/BrandNode"
import {ImageNode} from "../../../../src/models/images/types/ImageNode"

Then('the IMAGE {string} should be connected to the BRAND {string}',
    async (imageLabel: string, brandLabel: string) => {
        const brand: BrandNode = world.recallNode(brandLabel).data
        const image: ImageNode = world.recallNode(imageLabel).data

        const response = await axios
            .get(`${process.env.API_URL}/brands/${brand.id}/has-image/${image.id}`)
            .catch(error => {
                console.error(error)
            })

        if (!response) {
            assert.fail('Failed to fetch the car model belongs to brand relationship.')
        }

        assert(response.data.data.relationship_partner.data.id === image.id)
    })
