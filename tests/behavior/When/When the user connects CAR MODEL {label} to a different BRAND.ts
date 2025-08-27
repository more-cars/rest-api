import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {CarModelNode} from "../../../src/models/car-models/types/CarModelNode"
import {seedBrand} from "../../_toolbox/dbSeeding/brands/nodes/seedBrand"

When('the user connects CAR MODEL {string} to a different BRAND',
    async (carModelLabel: string) => {
        const carModel: CarModelNode = world.recallNode(carModelLabel).data
        const brand = await seedBrand()

        const response = await axios
            .post(`${process.env.API_URL}/car-models/${carModel.id}/belongs-to-brand/${brand.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
