import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {BrandNode} from "../../../src/models/brands/types/BrandNode"
import {seedCarModel} from "../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"

When('the user connects {int} CAR MODELs to BRAND {string}',
    async (carModelAmount: number, brandLabel: string) => {
        const brand: BrandNode = world.recallNode(brandLabel)

        for (let i = 0; i < carModelAmount; i++) {
            const carModel = await seedCarModel()

            await axios
                .post(`${process.env.API_URL}/brands/${brand.id}/has-car-model/${carModel.id}`)
                .catch(error => {
                    console.error(error)
                })
        }
    })
