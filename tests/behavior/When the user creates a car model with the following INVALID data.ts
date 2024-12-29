import {DataTable, When} from "@cucumber/cucumber"
import axios from "axios"

When('the user creates a car model with the following INVALID data', async function (dataTable: DataTable) {
    const idRow = dataTable.hashes()[0]
    const nameRow = dataTable.hashes()[1]

    const carModelData = {
        [idRow.attribute]: idRow.value,
        [nameRow.attribute]: nameRow.value,
    }

    this.latestResponse = await axios
        .post(`http://localhost:3000/car-models`, carModelData, { // TODO dynamic base url
            validateStatus: function (status) {
                return status === 422 // treating the 422 as a "good" status code, so axios does not fail the request
            }
        })
})
