import {DataTable, When} from "@cucumber/cucumber"
import axios from "axios"

When('the user creates a car model A with the following valid data', async function (dataTable: DataTable) {
    const idRow = dataTable.hashes()[0]
    const nameRow = dataTable.hashes()[1]

    const carModelData = {
        [idRow.attribute]: parseInt(idRow.value),
        [nameRow.attribute]: nameRow.value,
    }

    this.carModelA = carModelData
    this.latestResponse = await axios
        .post(`${process.env.API_URL}/car-models`, carModelData)
})
