import {When} from "@cucumber/cucumber"
import axios from "axios"
import {CarModelNode} from "../../../src/types/car-models/CarModelNode"
import {BrandNode} from "../../../src/types/brands/BrandNode"

When('the user connects brand {string} to car model {string}', async function (brandLabel: string, carModelLabel: string) {
    const carModel: CarModelNode = this.carModel[carModelLabel]
    const brand: BrandNode = this.brand[brandLabel]

    this.latestResponse = await axios
        .post(`${process.env.API_URL}/car-models/${carModel.id}/belongs-to-brand/${brand.id}`)
        .catch(error => {
            console.error(error.toJSON())
        })
})
