import {When} from "@cucumber/cucumber"
import axios from "axios"
import {BrandNode} from "../../../src/types/brands/BrandNode"
import {CarModelNode} from "../../../src/types/car-models/CarModelNode"

When('the user tries to connect BRAND {string} to CAR MODEL {string}',
    async function (brandLabel: string, carModelLabel: string) {
        const carModel: CarModelNode = this.carmodel[carModelLabel]
        const brand: BrandNode = this.brand[brandLabel]

        this.latestResponse = await axios
            .post(`${process.env.API_URL}/car-models/${carModel.id}/belongs-to-brand/${brand.id}`, null, {
                validateStatus: function (status) {
                    return status === 404 // treating the 404 as a "good" status code, so axios does not fail the request
                }
            })
            .catch(error => {
                console.error(error)
            })
    })
