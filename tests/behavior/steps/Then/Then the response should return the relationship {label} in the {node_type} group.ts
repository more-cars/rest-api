import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"
import {RelationshipManager} from "../../lib/RelationshipManager"

Then('the response should contain the relationship {string} in the {string} group',
    (label: string, node_type: string) => {
        const response = ResponseManager.getPreviousResponse()
        const data = response.body.data
        const groupKey = node_type.toLowerCase().replace(' ', '_') + 's'

        assert(data[groupKey].data[0].data.relationship_id === RelationshipManager.getRelationshipByLabel(label).data.relationship_id,
            `Relationship not found in the response`
        )
    })
