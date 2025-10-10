import {DataTable, Then, world} from "@cucumber/cucumber"
import assert from "assert"
import moment from "moment/moment"

Then('for each item the following properties in the response should contain a valid timestamp',
    (dataTable: DataTable) => {
        const rows = dataTable.hashes()
        const items = world.recallResponse().data.data

        items.forEach((item: any) => {
            rows.forEach((row) => {
                assert(moment(item[row.key]).isValid(), `"${item[row.key]}" is not a valid timestamp`)
            })
        })
    })
