import {When} from "@cucumber/cucumber"
import axios from "axios"
import {CarModelNode} from "../../../src/types/CarModelNode"
import {BrandNode} from "../../../src/types/BrandNode"
import {seedBrand} from "../../dbSeeding/seedBrand"

When('the user connects car model {string} to a different brand', async function (carModelLabel: string) {
    const carModel: CarModelNode = this.carModel[carModelLabel]
    const brand: BrandNode = await seedBrand()

    this.latestResponse = await axios
        .post(`${process.env.API_URL}/car-models/${carModel.id}/belongs-to-brand/${brand.id}`)
        .catch(error => {
            console.error(error.toJSON())
        })
})
