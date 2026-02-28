import {DataTable, Then} from "@cucumber/cucumber"
import assert from "assert"
import moment from "moment/moment"
import {ResponseManager} from "../../lib/ResponseManager"

Then('the following properties in the response should contain a valid timestamp',
    (dataTable: DataTable) => {
        const response = ResponseManager.getPreviousResponse()
        const data = response.body.data

        const rows = dataTable.hashes()
        rows.forEach((row) => {
            assert(moment(data[row.key]).isValid(), `"${data[row.key]}" is not a valid timestamp`)
        })
    })
