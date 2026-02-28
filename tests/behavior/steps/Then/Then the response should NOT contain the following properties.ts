import {DataTable, Then, world} from "@cucumber/cucumber"
import assert from "assert"
import type {ApiResponse} from "../../lib/ApiResponse"

Then('the response should NOT contain the following properties',
    (dataTable: DataTable) => {
        const response = world.recallResponse() as ApiResponse
        const data = response.body.data

        const properties = dataTable.hashes()
        properties.forEach((property) => {
            assert.notEqual(
                data[property.key],
                property.value,
                `Expected the property "${property.key}" not to have value "${property.value}"`,
            )
        })
    })
