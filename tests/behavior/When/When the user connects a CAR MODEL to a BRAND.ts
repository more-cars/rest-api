import {When} from "@cucumber/cucumber"
import axios from "axios"
import {seedBrand} from "../../dbSeeding/brands/nodes/seedBrand"
import {seedCarModel} from "../../dbSeeding/car-models/nodes/seedCarModel.ts"

When('the user connects a CAR MODEL to a BRAND',
    async function () {
        const brand = await seedBrand()
        const carModel = await seedCarModel()

        this.latestResponse = await axios
            .post(`${process.env.API_URL}/brands/${brand.id}/has-car-model/${carModel.id}`)
            .catch(error => {
                console.error(error)
            })
    })
