import {DataTable, Then, world} from "@cucumber/cucumber"
import assert from "assert"

Then('the response should contain the following keys for each node',
    (dataTable: DataTable) => {
        const rows = dataTable.hashes()
        const responseItems = world.recallResponse().data.data

        responseItems.forEach((item: any) => {
            rows.forEach((row) => {
                assert(row.key in item.data, `"${row.key}" not found in the response`)
            })
        })
    })
