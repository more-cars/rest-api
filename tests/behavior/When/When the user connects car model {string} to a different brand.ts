import {When} from "@cucumber/cucumber"
import axios from "axios"
import {CarModelNode} from "../../../src/types/car-models/CarModelNode"
import {BrandNode} from "../../../src/types/brands/BrandNode"
import {seedBrand} from "../../dbSeeding/brands/nodes/seedBrand"

When('the user connects car model {string} to a different brand', async function (carModelLabel: string) {
    const carModel: CarModelNode = this.carmodel[carModelLabel]
    const brand: BrandNode = await seedBrand()

    this.latestResponse = await axios
        .post(`${process.env.API_URL}/car-models/${carModel.id}/belongs-to-brand/${brand.id}`)
        .catch(error => {
            console.error(error)
        })
})
