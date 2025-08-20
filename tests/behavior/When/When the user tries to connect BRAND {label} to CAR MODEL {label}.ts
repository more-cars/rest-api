import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {BrandNode} from "../../../src/models/brands/types/BrandNode"
import {CarModelNode} from "../../../src/models/car-models/types/CarModelNode"

When('the user tries to connect BRAND {string} to CAR MODEL {string}',
    async (brandLabel: string, carModelLabel: string) => {
        const carModel: CarModelNode = world.recallNode(carModelLabel)
        const brand: BrandNode = world.recallNode(brandLabel)

        const response = await axios
            .post(`${process.env.API_URL}/car-models/${carModel.id}/belongs-to-brand/${brand.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
