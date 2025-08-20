import {DataTable, When, world} from "@cucumber/cucumber"
import axios from "axios"
import {seedBrand} from "../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {seedCarModel} from "../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"

When('the user creates a relationship with the following data',
    async (dataTable: DataTable) => {
        const brand = await seedBrand()
        const carModel = await seedCarModel()
        const rows = dataTable.hashes()
        const data: any = {}

        rows.forEach((row) => {
            data[row.key] = row.value
        })

        const response = await axios
            .post(`${process.env.API_URL}/brands/${brand.id}/has-car-model/${carModel.id}`, data)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
