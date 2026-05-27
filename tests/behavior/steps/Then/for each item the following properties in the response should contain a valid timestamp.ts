import {DataTable, Then} from "@cucumber/cucumber"
import assert from "assert"
import moment from "moment/moment"
import {ResponseManager} from "../../lib/ResponseManager"

Then('for each item the following properties in the response should contain a valid timestamp',
    (dataTable: DataTable) => {
        const response = ResponseManager.getPreviousResponse()
        const data = response.body.data

        const rows = dataTable.hashes()
        data.forEach((item: any) => {
            rows.forEach((row) => {
                assert(moment(item[row.key]).isValid(), `"${item[row.key]}" is not a valid timestamp`)
            })
        })
    })
