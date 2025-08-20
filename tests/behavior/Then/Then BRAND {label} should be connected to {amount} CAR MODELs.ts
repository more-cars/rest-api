import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import axios from "axios"
import {BrandNode} from "../../../src/models/brands/types/BrandNode"

Then('BRAND {string} should be connected to {int} CAR MODELs',
    async (brandLabel: string, carModelAmount: string) => {
        const brand: BrandNode = world.recallNode(brandLabel)

        const response = await axios
            .get(`${process.env.API_URL}/brands/${brand.id}/has-car-model`)
            .catch(error => {
                console.error(error)
            })

        if (!response) {
            assert.fail('Failed to fetch the brand-has-car-model relationships.')
        }

        assert(response.data.length === carModelAmount)
    })
