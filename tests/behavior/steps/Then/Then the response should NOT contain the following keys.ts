import {DataTable, Then, world} from "@cucumber/cucumber"
import assert from "assert"
import type {ApiResponse} from "../../lib/ApiResponse"

Then('the response should NOT contain the following keys',
    (dataTable: DataTable) => {
        const response = world.recallResponse() as ApiResponse
        const data = response.body.data

        const rows = dataTable.hashes()
        rows.forEach((row) => {
            assert.notEqual(row.key in data, `"${row.key}" is not supposed to be in the response`)
        })
    })
