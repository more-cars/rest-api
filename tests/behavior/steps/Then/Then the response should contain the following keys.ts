import {DataTable, Then} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"

Then('the response should contain the following keys',
    (dataTable: DataTable) => {
        const keys = dataTable.hashes().map(row => row.key)
        const response = ResponseManager.getPreviousResponse()

        // TODO temporary workaround -> can be removed when all relationship-related scenarios have been migrated
        if (keys.includes('relationship_id')) {
            assert('relationship_id' in response.body.data, "relationship_id not found in the response")
            assert('relationship_name' in response.body.data, "relationship_name not found in the response")
            assert('start_node' in response.body.data, "start_node not found in the response")
            assert('partner_node' in response.body.data, "partner_node not found in the response")

            return
        }

        const data = response.body.attributes
        keys.forEach((key) => {
            assert(key in data, `"${key}" not found in the response`)
        })
    })
