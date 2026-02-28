import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"

Then('the response should contain a {string} group',
    (nodeType: string) => {
        const response = ResponseManager.getPreviousResponse()
        const data = response.body.data

        const groupKey = nodeType.toLowerCase().replace(' ', '_') + 's'
        assert(groupKey in data, `Field "${groupKey}" not found in the response`)
    })
