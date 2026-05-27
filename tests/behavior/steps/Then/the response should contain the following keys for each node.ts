import {DataTable, Then} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"
import type {NodeResponse} from "../../../../src/controllers/types/NodeResponse"

Then('the response should contain the following keys for each node',
    (dataTable: DataTable) => {
        const response = ResponseManager.getPreviousResponse()
        const data = response.body.data

        const rows = dataTable.hashes()
        data.forEach((item: NodeResponse) => {
            rows.forEach((row) => {
                assert(row.key in item.attributes, `"${row.key}" not found in the response`)
            })
        })
    })
