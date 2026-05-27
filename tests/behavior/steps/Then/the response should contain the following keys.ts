import {DataTable, Then} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"

Then('the response should contain the following keys',
    (dataTable: DataTable) => {
        const keys = dataTable.hashes().map(row => row.key)
        const response = ResponseManager.getPreviousResponse()

        const data = response.body.attributes
        keys.forEach((key) => {
            assert(key in data, `"${key}" not found in the response`)
        })
    })
