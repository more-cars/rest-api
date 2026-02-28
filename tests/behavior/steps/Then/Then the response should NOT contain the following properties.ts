import {DataTable, Then} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"

Then('the response should NOT contain the following properties',
    (dataTable: DataTable) => {
        const response = ResponseManager.getPreviousResponse()
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
