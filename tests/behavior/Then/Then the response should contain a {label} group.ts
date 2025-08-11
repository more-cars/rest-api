import {Then} from "@cucumber/cucumber"
import assert from "assert"

Then('the response should contain a {string} group',
    function (node_type: string) {
        const groupKey = node_type.toLowerCase().replace(' ', '_') + 's'

        assert(groupKey in this.latestResponse.data, `Field "${groupKey}" not found in the response`)
    })
