import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import {performApiRequest} from "../../lib/performApiRequest"

Then('the relationship {string} should not exist anymore',
    async (label: string) => {
        const rel = world.recallRelationship(label)
        const path = `/car-models/${rel.car_model_id}/belongs-to-brand/${rel.brand_id}`

        const response = await performApiRequest(path, 'GET')

        assert.equal(response.status_code, 404)
    })
