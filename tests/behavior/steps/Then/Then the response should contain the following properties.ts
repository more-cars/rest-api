import {DataTable, Then} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"

Then('the response should contain the following properties',
    (dataTable: DataTable) => {
        const response = ResponseManager.getPreviousResponse()
        const data = response.body.attributes

        const properties = dataTable.hashes()
        properties.forEach((property) => {
            if (property.value === '') {
                assert(
                    data[property.key] === null,
                    `Expected property "${property.key}" to have value "null", but got "${data[property.key]}."`)
            } else if (!isNaN(Number(property.value))) {
                data[property.key] = Number(property.value)
                assert(
                    data[property.key] === Number(property.value),
                    `Expected property "${property.key}" to have value "${property.value}", but got "${data[property.key]}."`)
            } else {
                assert(
                    data[property.key] = property.value,
                    `Expected property "${property.key}" to have value "${property.value}", but got "${data[property.key]}."`)
            }
        })
    })
