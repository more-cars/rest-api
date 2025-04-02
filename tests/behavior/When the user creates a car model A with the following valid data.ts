import {DataTable, When} from "@cucumber/cucumber"
import axios from "axios"

When('the user creates a car model A with the following valid data', async function (dataTable: DataTable) {
    const nameRow = dataTable.hashes()[0]

    const carModelData = {
        [nameRow.attribute]: nameRow.value,
    }

    this.carModelA = carModelData
    this.latestResponse = await axios
        .post(`${process.env.API_URL}/car-models`, carModelData)
        .catch(error => {
            console.error(error.toJSON())
        })
    this.carModelA['mc_id'] = this.latestResponse.data.mc_id
})
