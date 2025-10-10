import {DataTable, Then, world} from "@cucumber/cucumber"
import assert from "assert"

Then('the response should NOT contain the following properties',
    (dataTable: DataTable) => {
        const properties = dataTable.hashes()
        const responseData = world.recallResponse().data.data

        properties.forEach((property) => {
            assert.notEqual(
                responseData[property.key],
                property.value,
                `Expected the property "${property.key}" not to have value "${property.value}"`,
            )
        })
    })
