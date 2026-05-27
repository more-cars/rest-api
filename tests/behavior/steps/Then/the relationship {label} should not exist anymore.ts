import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {RelationshipManager} from "../../lib/RelationshipManager"
import {performApiRequest} from "../../lib/performApiRequest"

Then('the relationship {string} should not exist anymore',
    async (label: string) => {
        const relationship = RelationshipManager.getRelationshipByLabel(label)
        const path = relationship.links.self

        const response = await performApiRequest(path, 'GET')

        assert.ok(response.body.data === null || response.body.data.length === 0)
    })
