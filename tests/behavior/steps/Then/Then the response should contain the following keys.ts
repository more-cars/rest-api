import {DataTable, Then, world} from "@cucumber/cucumber"
import assert from "assert"

Then('the response should contain the following keys',
    (dataTable: DataTable) => {
        const rows = dataTable.hashes()
        const responseData = world.recallResponse().data

        rows.forEach((row) => {
            assert(row.key in responseData, `"${row.key}" not found in the response`)
        })
    })
