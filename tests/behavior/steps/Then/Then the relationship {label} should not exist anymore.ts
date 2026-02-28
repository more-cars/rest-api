import {Then} from "@cucumber/cucumber"
// import assert from "assert"
// import {RelationshipManager} from "../../lib/RelationshipManager"
// import {performApiRequest} from "../../lib/performApiRequest"

Then('the relationship {string} should not exist anymore',
    async (label: string) => {
        // const rel = RelationshipManager.getRelationshipByLabel(label)
        // const path = `/car-models/${rel.start_node.fields.id}/belongs-to-brand/${rel.data.relationship_partner.data.id}`
        //
        // const response = await performApiRequest(path, 'GET')
        //
        // assert.equal(response.status_code, 404)
    })
