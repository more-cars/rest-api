import {DataTable, When} from "@cucumber/cucumber"
import axios from "axios"

When('the user creates a brand A with the following valid/mixed data', async function (dataTable: DataTable) {
    const rows = dataTable.hashes()

    const data: any = {}
    rows.forEach((row) => {
        data[row.key] = row.value
    })

    this.brandA = data
    this.latestResponse = await axios
        .post(`${process.env.API_URL}/brands`, data)
        .catch(error => {
            console.error(error.toJSON())
        })
    this.brandA['id'] = this.latestResponse.data.id
})
