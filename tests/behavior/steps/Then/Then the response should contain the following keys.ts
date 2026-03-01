import {DataTable, Then} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"

Then('the response should contain the following keys',
    (dataTable: DataTable) => {
        let keys = dataTable.hashes().map(row => row.key)

        if (keys.includes('relationship_id')) { // TODO temporary workaround -> can be removed when all relationship-related scenarios have been migrated
            keys = ['relationship_id', 'relationship_name', 'partner_node']
        }

        const response = ResponseManager.getPreviousResponse()
        const data = response.body.data

        keys.forEach((key) => {
            assert(key in data, `"${key}" not found in the response`)
        })
    })
