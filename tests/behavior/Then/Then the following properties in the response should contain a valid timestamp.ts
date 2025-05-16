import {DataTable, Then} from "@cucumber/cucumber"
import assert from "assert"
import moment from "moment/moment"

Then('the following properties in the response should contain a valid timestamp', function (dataTable: DataTable) {
    const rows = dataTable.hashes()
    const responseData = this.latestResponse.data

    rows.forEach((row) => {
        assert(moment(responseData[row.key]).isValid(), `"${responseData[row.key]}" is not a valid timestamp`)
    })
})
