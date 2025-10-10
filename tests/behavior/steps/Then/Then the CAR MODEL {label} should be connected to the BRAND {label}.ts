import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import axios from "axios"
import {CarModelNode} from "../../../../src/models/car-models/types/CarModelNode"
import {BrandNode} from "../../../../src/models/brands/types/BrandNode"

Then('the CAR MODEL {string} should be connected to the BRAND {string}',
    async (carModelLabel: string, brandLabel: string) => {
        const carModel: CarModelNode = world.recallNode(carModelLabel).data
        const brand: BrandNode = world.recallNode(brandLabel).data

        const response = await axios
            .get(`${process.env.API_URL}/car-models/${carModel.id}/belongs-to-brand`)
            .catch(error => {
                console.error(error)
            })

        if (!response) {
            assert.fail('Failed to fetch the car model belongs to brand relationship.')
        }

        assert(response.data.data.relationship_partner.data.id === brand.id)
    })
