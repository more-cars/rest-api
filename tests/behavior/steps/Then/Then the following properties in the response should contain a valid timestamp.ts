import {DataTable, Then, world} from "@cucumber/cucumber"
import assert from "assert"
import moment from "moment/moment"
import type {ApiResponse} from "../../lib/ApiResponse"

Then('the following properties in the response should contain a valid timestamp',
    (dataTable: DataTable) => {
        const response = world.recallResponse() as ApiResponse
        const data = response.body.data

        const rows = dataTable.hashes()
        rows.forEach((row) => {
            assert(moment(data[row.key]).isValid(), `"${data[row.key]}" is not a valid timestamp`)
        })
    })
