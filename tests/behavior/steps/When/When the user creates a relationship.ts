import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {seedCarModel} from "../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {seedBrand} from "../../../_toolbox/dbSeeding/brands/nodes/seedBrand"

When('the user creates a relationship',
    async () => {
        const brand = await seedBrand()
        const carModel = await seedCarModel()

        const response = await axios
            .post(`${process.env.API_URL}/brands/${brand.id}/has-car-model/${carModel.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
