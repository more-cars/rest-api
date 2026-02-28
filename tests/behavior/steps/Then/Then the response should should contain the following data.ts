import {DataTable, Then, world} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"

Then('the response should contain the following data',
    (dataTable: DataTable) => {
        const rows = dataTable.hashes()
        const response = ResponseManager.getPreviousResponse()
        const data = response.body.data

        rows.forEach((row) => {
            assert(data[row.key].toString() === row.value, `Property "${row.key}" does not have value "${row.value}"`)
        })
    })
