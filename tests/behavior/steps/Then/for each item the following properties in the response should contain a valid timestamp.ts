import {DataTable, Then} from "@cucumber/cucumber"
import assert from "assert"
import moment from "moment/moment"
import {ResponseManager} from "../../lib/ResponseManager"
import type {NodeResponse} from "../../../../src/controllers/types/NodeResponse"

Then('for each item the following properties in the response should contain a valid timestamp',
    (dataTable: DataTable) => {
        const response = ResponseManager.getPreviousResponse()
        const data = response.body.data as NodeResponse[]

        const rows = dataTable.hashes()
        data.forEach(item => {
            rows.forEach((row) => {
                assert(moment(item.attributes[row.key] as string).isValid(), `"${item.attributes[row.key]}" is not a valid timestamp`)
            })
        })
    })
