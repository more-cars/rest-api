import {DataTable, Then, world} from "@cucumber/cucumber"
import assert from "assert"

Then('the following keys in the response object should be of value null',
    (dataTable: DataTable) => {
        const rows = dataTable.hashes()
        const responseData = world.recallResponse().data.data

        rows.forEach((row) => {
            assert(responseData[row.key] === null, `"${row.key}" is not null`)
        })
    })
