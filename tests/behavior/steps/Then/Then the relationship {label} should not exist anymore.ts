import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {RelationshipManager} from "../../lib/RelationshipManager"
import {performApiRequest} from "../../lib/performApiRequest"

Then('the relationship {string} should not exist anymore',
    async (label: string) => {
        const relationship = RelationshipManager.getRelationshipByLabel(label)
        const path = `/relationships/${relationship.data.relationship_id}`

        const response = await performApiRequest(path, 'GET')

        assert.equal(response.status_code, 404)
    })
