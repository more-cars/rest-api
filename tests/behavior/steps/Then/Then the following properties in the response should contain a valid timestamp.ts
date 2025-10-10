import {DataTable, Then, world} from "@cucumber/cucumber"
import assert from "assert"
import moment from "moment/moment"

Then('the following properties in the response should contain a valid timestamp',
    (dataTable: DataTable) => {
        const rows = dataTable.hashes()
        const responseData = world.recallResponse().data.data

        rows.forEach((row) => {
            assert(moment(responseData[row.key]).isValid(), `"${responseData[row.key]}" is not a valid timestamp`)
        })
    })
