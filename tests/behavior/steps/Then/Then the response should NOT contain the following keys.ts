import {DataTable, Then} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"

Then('the response should NOT contain the following keys',
    (dataTable: DataTable) => {
        const response = ResponseManager.getPreviousResponse()
        const data = response.body.data

        const rows = dataTable.hashes()
        rows.forEach((row) => {
            assert.notEqual(row.key in data, `"${row.key}" is not supposed to be in the response`)
        })
    })
