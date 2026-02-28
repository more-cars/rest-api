import {DataTable, Then, world} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"

Then('the response should contain the following keys',
    (dataTable: DataTable) => {
        const rows = dataTable.hashes()
        const response = ResponseManager.getPreviousResponse()
        const data = response.body.data

        rows.forEach((row) => {
            assert(row.key in data, `"${row.key}" not found in the response`)
        })
    })
