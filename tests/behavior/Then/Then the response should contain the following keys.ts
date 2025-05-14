import {DataTable, Then} from "@cucumber/cucumber"
import assert from "assert"

Then('the response should contain the following keys', function (dataTable: DataTable) {
    const rows = dataTable.hashes()
    const responseData = this.latestResponse.data

    rows.forEach((row) => {
        assert(row.key in responseData, `"${row.key}" not found in the response`)
    })
})
