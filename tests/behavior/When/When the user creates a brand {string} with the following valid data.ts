import {DataTable, When} from "@cucumber/cucumber"
import axios from "axios"

When('the user creates a brand {string} with the following valid/mixed data', async function (label: string, dataTable: DataTable) {
    const rows = dataTable.hashes()

    const data: any = {}
    rows.forEach((row) => {
        data[row.key] = row.value
    })

    this.brand[label] = data
    this.latestResponse = await axios
        .post(`${process.env.API_URL}/brands`, data)
        .catch(error => {
            console.error(error)
        })
    this.brand[label]['id'] = this.latestResponse.data.id
})
