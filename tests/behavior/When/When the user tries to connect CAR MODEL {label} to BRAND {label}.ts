import {When} from "@cucumber/cucumber"
import axios from "axios"
import {BrandNode} from "../../../src/types/brands/BrandNode"
import {CarModelNode} from "../../../src/types/car-models/CarModelNode"

When('the user tries to connect CAR MODEL {string} to BRAND {string}', async function (carModelLabel: string, brandLabel: string) {
    const brand: BrandNode = this.brand[brandLabel]
    const carModel: CarModelNode = this.carmodel[carModelLabel]

    this.latestResponse = await axios
        .post(`${process.env.API_URL}/brands/${brand.id}/has-car-model/${carModel.id}`, null, {
            validateStatus: function (status) {
                return status === 404 // treating the 404 as a "good" status code, so axios does not fail the request
            }
        })
        .catch(error => {
            console.error(error)
        })
})
