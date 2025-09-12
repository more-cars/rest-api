import {DataTable, Then, world} from "@cucumber/cucumber"
import assert from "assert"

Then('the response should contain the following properties',
    (dataTable: DataTable) => {
        const rows = dataTable.hashes()
        const responseData = world.recallResponse().data

        rows.forEach((row) => {
            if (row.datatype === 'string') {
                assert(responseData[row.key] === (row.value === '' ? null : row.value), `Property "${row.key}" does not have value "${row.value}"`)
            } else if (row.datatype === 'number') {
                assert(responseData[row.key] === (row.value === '' ? null : parseInt(row.value)), `Property "${row.key}" does not have value "${row.value}"`)
            } else if (row.datatype === 'boolean') {
                assert(responseData[row.key] === (row.value === '' ? null : row.value), `Property "${row.key}" does not have value "${row.value}"`)
            } else {
                assert.fail(`Datatype information missing for property "${row.key}"`)
            }
        })
    })
