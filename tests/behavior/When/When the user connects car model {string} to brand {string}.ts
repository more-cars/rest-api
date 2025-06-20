import {When} from "@cucumber/cucumber"
import axios from "axios"
import {BrandNode} from "../../../src/models/brands/types/BrandNode"
import {CarModelNode} from "../../../src/types/car-models/CarModelNode"

When('the user connects car model {string} to brand {string}', async function (carModelLabel: string, brandLabel: string) {
    const brand: BrandNode = this.brand[brandLabel]
    const carModel: CarModelNode = this.carmodel[carModelLabel]

    this.latestResponse = await axios
        .post(`${process.env.API_URL}/brands/${brand.id}/has-car-model/${carModel.id}`)
        .catch(error => {
            console.error(error)
        })
})
