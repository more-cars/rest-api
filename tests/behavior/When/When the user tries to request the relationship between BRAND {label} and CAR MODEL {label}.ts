import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import type {BrandNode} from "../../../src/models/brands/types/BrandNode"
import type {CarModelNode} from "../../../src/models/car-models/types/CarModelNode"

When('the user tries to request the relationship between BRAND {string} and CAR MODEL {string}',
    async (brandLabel: string, carModelLabel: string) => {
        const brand: BrandNode = world.recallNode(brandLabel)
        const carModel: CarModelNode = world.recallNode(carModelLabel)

        const response = await axios
            .get(`${process.env.API_URL}/brands/${brand.id}/has-car-model/${carModel.id}`, {
                validateStatus: function (status) {
                    return status === 404 // treating 404 as a "good" status code, so axios does not fail the request
                }
            })
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
