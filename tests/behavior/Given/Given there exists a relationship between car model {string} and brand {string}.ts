import {Given} from "@cucumber/cucumber"
import {CarModelNode} from "../../../src/types/CarModelNode"
import {BrandNode} from "../../../src/types/BrandNode"
import axios from "axios"

Given('there exists a relationship between car model {string} and brand {string}', async function (carModelLabel: string, brandLabel: string) {
    const carModel: CarModelNode = this.carModel[carModelLabel]
    const brand: BrandNode = this.brand[brandLabel]

    this.latestResponse = await axios
        .post(`${process.env.API_URL}/car-models/${carModel.id}/belongs-to-brand/${brand.id}`)
        .catch(error => {
            console.error(error.toJSON())
        })
})
