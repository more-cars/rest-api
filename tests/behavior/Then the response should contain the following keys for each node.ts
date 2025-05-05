import {DataTable, Then} from "@cucumber/cucumber"
import assert from "assert"

Then('the response should contain the following keys for each node', function (dataTable: DataTable) {
    const rows = dataTable.hashes()
    const responseItems = this.latestResponse.data

    responseItems.forEach((item: any) => {
        rows.forEach((row) => {
            assert(row.key in item, `"${row.key}" not found in the response`)
        })
    })
})
