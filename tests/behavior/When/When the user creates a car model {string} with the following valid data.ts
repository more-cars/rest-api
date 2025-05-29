import {DataTable, When} from "@cucumber/cucumber"
import axios from "axios"

When('the user creates a car model {string} with the following valid data', async function (label: string, dataTable: DataTable) {
    const rows = dataTable.hashes()

    const carModelData: any = {}
    rows.forEach((row) => {
        carModelData[row.key] = row.value
    })

    this.carModel[label] = carModelData
    this.latestResponse = await axios
        .post(`${process.env.API_URL}/car-models`, carModelData)
        .catch(error => {
            console.error(error)
        })
    this.carModel[label]['id'] = this.latestResponse.data.id
})
