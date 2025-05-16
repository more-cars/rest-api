import {DataTable, Then} from "@cucumber/cucumber"
import assert from "assert"

Then('the response should NOT contain the following properties', function (dataTable: DataTable) {
    const properties = dataTable.hashes()
    const responseData = this.latestResponse.data

    properties.forEach((property) => {
        assert.notEqual(
            responseData[property.key],
            property.value,
            `Expected the property "${property.key}" not to have value "${property.value}"`,
        )
    })
})
