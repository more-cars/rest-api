import {Then, world} from "@cucumber/cucumber"
import axios from "axios"
import assert from "assert"

Then('the relationship {string} should not exist anymore',
    async (label: string) => {
        const rel = world.recallRelationship(label)

        const response = await axios
            .get(`${process.env.API_URL}/car-models/${rel.car_model_id}/belongs-to-brand/${rel.brand_id}`)
            .catch(error => {
                console.error(error)
            })

        if (!response) {
            assert.fail('Request failed')
        }

        assert.equal(response.status, 404)
    })
