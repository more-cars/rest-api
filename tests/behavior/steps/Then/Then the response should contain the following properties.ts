import {DataTable, Then, world} from "@cucumber/cucumber"
import assert from "assert"
import type {ApiResponse} from "../../lib/ApiResponse"

Then('the response should contain the following properties',
    (dataTable: DataTable) => {
        const response = world.recallResponse() as ApiResponse
        const data = response.body.data

        const rows = dataTable.hashes()
        rows.forEach((row) => {
            if (row.datatype === 'string' || row.datatype === 'boolean') {
                assert(data[row.key] === (row.value === '' ? null : row.value), `Expected property "${row.key}" to have value "${row.value}", but got "${data[row.key]}."`)
            } else if (row.datatype === 'number') {
                assert(data[row.key] === (row.value === '' ? null : parseFloat(row.value)), `Expected property "${row.key}" to have value "${row.value}", but got "${data[row.key]}."`)
            } else {
                assert.fail(`Datatype information missing for property "${row.key}"`)
            }
        })
    })
