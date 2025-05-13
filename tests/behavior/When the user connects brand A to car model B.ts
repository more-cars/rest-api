import {When} from "@cucumber/cucumber"
import axios from "axios"
import {CarModelNode} from "../../src/types/CarModelNode"
import {BrandNode} from "../../src/types/BrandNode"

When('the user connects brand A to car model B', async function () {
    const carModel: CarModelNode = this.carModelB
    const brand: BrandNode = this.brandA

    this.latestResponse = await axios
        .post(`${process.env.API_URL}/car-models/${carModel.id}/belongs-to-brand/${brand.id}`)
        .catch(error => {
            console.error(error.toJSON())
        })
})
