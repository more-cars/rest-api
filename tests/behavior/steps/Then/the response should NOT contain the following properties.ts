import {DataTable, Then} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"

Then('the response should NOT contain the following properties',
    (dataTable: DataTable) => {
        const response = ResponseManager.getPreviousResponse()
        const properties = dataTable.hashes()

        // TODO temporary workaround -> can be removed when all relationship-related scenarios have been migrated
        if ('data' in response.body) {
            properties.forEach((property) => {
                assert.notEqual(
                    response.body.data[property.key],
                    property.value,
                    `Expected the property "${property.key}" not to have value "${property.value}"`,
                )
            })

            return
        }

        const data = response.body.attributes
        properties.forEach((property) => {
            assert.notEqual(
                data[property.key],
                property.value,
                `Expected the property "${property.key}" not to have value "${property.value}"`,
            )
        })
    })
