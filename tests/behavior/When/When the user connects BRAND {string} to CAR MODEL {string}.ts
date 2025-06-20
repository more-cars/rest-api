import {When} from "@cucumber/cucumber"
import axios from "axios"
import {CarModelNode} from "../../../src/types/car-models/CarModelNode"
import {BrandNode} from "../../../src/models/brands/types/BrandNode"

When('the user connects BRAND {string} to CAR MODEL {string}', async function (brandLabel: string, carModelLabel: string) {
    const carModel: CarModelNode = this.carmodel[carModelLabel]
    const brand: BrandNode = this.brand[brandLabel]

    this.latestResponse = await axios
        .post(`${process.env.API_URL}/car-models/${carModel.id}/belongs-to-brand/${brand.id}`)
        .catch(error => {
            console.error(error)
        })
})
