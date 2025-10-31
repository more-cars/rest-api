import {DataTable, Then, world} from "@cucumber/cucumber"
import assert from "assert"

Then('the response should contain the following properties',
    (dataTable: DataTable) => {
        const rows = dataTable.hashes()
        const responseData = world.recallResponse().data.data

        rows.forEach((row) => {
            if (row.datatype === 'string' || row.datatype === 'boolean') {
                assert(responseData[row.key] === (row.value === '' ? null : row.value), `Expected property "${row.key}" to have value "${row.value}", but got "${responseData[row.key]}."`)
            } else if (row.datatype === 'number') {
                assert(responseData[row.key] === (row.value === '' ? null : parseFloat(row.value)), `Expected property "${row.key}" to have value "${row.value}", but got "${responseData[row.key]}."`)
            } else {
                assert.fail(`Datatype information missing for property "${row.key}"`)
            }
        })
    })
