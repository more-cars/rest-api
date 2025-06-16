import {When} from "@cucumber/cucumber"
import axios from "axios"
import {seedCarModel} from "../../dbSeeding/car-models/nodes/seedCarModel"
import {seedBrand} from "../../dbSeeding/brands/nodes/seedBrand"

When('the user creates a relationship',
    async function () {
        const brand = await seedBrand()
        const carModel = await seedCarModel()

        this.latestResponse = await axios
            .post(`${process.env.API_URL}/brands/${brand.id}/has-car-model/${carModel.id}`)
            .catch(error => {
                console.error(error)
            })
    })
