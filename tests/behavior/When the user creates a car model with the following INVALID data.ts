import {DataTable, When} from "@cucumber/cucumber"
import axios from "axios"

When('the user creates a car model with the following INVALID data', async function (dataTable: DataTable) {
    const nameRow = dataTable.hashes()[0]

    const carModelData = {
        [nameRow.attribute]: nameRow.value,
    }

    this.latestResponse = await axios
        .post(`${process.env.API_URL}/car-models`, carModelData, {
            validateStatus: function (status) {
                return status === 422 // treating the 422 as a "good" status code, so axios does not fail the request
            }
        })
})
