import {DataTable, Then} from "@cucumber/cucumber"
import assert from "assert"

Then('the response should contain the following data', function (dataTable: DataTable) {
    const rows = dataTable.hashes()
    const responseData = this.latestResponse.data

    rows.forEach((row) => {
        assert(responseData[row.key] === row.value, `Property "${row.key}" does not have value "${row.value}"`)
    })
})
