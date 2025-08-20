import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {seedBrand} from "../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {seedCarModel} from "../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"

When('the user connects a CAR MODEL to a BRAND',
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
