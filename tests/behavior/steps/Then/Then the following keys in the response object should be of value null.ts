import {DataTable, Then, world} from "@cucumber/cucumber"
import assert from "assert"
import type {ApiResponse} from "../../lib/ApiResponse"

Then('the following keys in the response object should be of value null',
    (dataTable: DataTable) => {
        const response = world.recallResponse() as ApiResponse
        const data = response.body.data

        const rows = dataTable.hashes()
        rows.forEach((row) => {
            assert(data[row.key] === null, `"${row.key}" is not null`)
        })
    })
