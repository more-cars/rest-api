import {DataTable, Then, world} from "@cucumber/cucumber"
import assert from "assert"

Then('the response should contain the following data',
    (dataTable: DataTable) => {
        const rows = dataTable.hashes()
        const responseData = world.recallResponse().data

        rows.forEach((row) => {
            assert(responseData[row.key].toString() === row.value, `Property "${row.key}" does not have value "${row.value}"`)
        })
    })
