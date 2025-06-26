import {DataTable, When} from "@cucumber/cucumber"
import axios from "axios"
import {seedBrand} from "../../dbSeeding/brands/nodes/seedBrand"
import {seedCarModel} from "../../dbSeeding/car-models/nodes/seedCarModel"

When('the user creates a relationship with the following data',
    async function (dataTable: DataTable) {
        const brand = await seedBrand()
        const carModel = await seedCarModel()
        const rows = dataTable.hashes()
        const data: any = {}

        rows.forEach((row) => {
            data[row.key] = row.value
        })

        this.latestResponse = await axios
            .post(`${process.env.API_URL}/brands/${brand.id}/has-car-model/${carModel.id}`, data)
            .catch(error => {
                console.error(error)
            })
    })
