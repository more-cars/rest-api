import {DataTable, Then, world} from "@cucumber/cucumber"
import assert from "assert"
import type {ApiResponse} from "../../lib/ApiResponse"

Then('the response should contain the following keys for each node',
    (dataTable: DataTable) => {
        const response = world.recallResponse() as ApiResponse
        const data = response.body.data

        const rows = dataTable.hashes()
        data.forEach((item: any) => {
            rows.forEach((row) => {
                assert(row.key in item.data, `"${row.key}" not found in the response`)
            })
        })
    })
