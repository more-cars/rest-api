import {Then} from "@cucumber/cucumber"
import assert from "assert"

Then('the response should contain the relationship {string} in the {string} group',
    function (label: string, node_type: string) {
        const groupKey = node_type.toLowerCase().replace(' ', '_') + 's'

        assert(this.latestResponse.data[groupKey][0].relationship_id === this.relationship[label].relationship_id,
            `Relationship not found in the response`
        )
    })
