import {DataTable, Then} from "@cucumber/cucumber"
import assert from "assert"

Then('the response should NOT contain the following keys', function (dataTable: DataTable) {
    const rows = dataTable.hashes()
    const responseData = this.latestResponse.data

    rows.forEach((row) => {
        assert.notEqual(row.key in responseData, `"${row.key}" is not supposed to be in the response`)
    })
})
