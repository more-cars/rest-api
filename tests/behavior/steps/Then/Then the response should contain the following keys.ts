import {DataTable, Then, world} from "@cucumber/cucumber"
import assert from "assert"
import type {ApiResponse} from "../../lib/ApiResponse"

Then('the response should contain the following keys',
    (dataTable: DataTable) => {
        const rows = dataTable.hashes()
        const response = world.recallResponse() as ApiResponse
        const data = response.body.data

        rows.forEach((row) => {
            assert(row.key in data, `"${row.key}" not found in the response`)
        })
    })
