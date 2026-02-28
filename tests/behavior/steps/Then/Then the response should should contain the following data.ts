import {DataTable, Then, world} from "@cucumber/cucumber"
import assert from "assert"
import type {ApiResponse} from "../../lib/ApiResponse"

Then('the response should contain the following data',
    (dataTable: DataTable) => {
        const rows = dataTable.hashes()
        const response = world.recallResponse() as ApiResponse
        const data = response.body.data

        rows.forEach((row) => {
            assert(data[row.key].toString() === row.value, `Property "${row.key}" does not have value "${row.value}"`)
        })
    })
