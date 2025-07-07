import {Then} from "@cucumber/cucumber"
import axios from "axios"
import assert from "assert"

Then('the relationship {string} should not exist anymore',
    async function (relationshipLabel: string) {
        const rel = this.relationship[relationshipLabel]

        const response = await axios
            .get(`${process.env.API_URL}/car-models/${rel.car_model_id}/belongs-to-brand/${rel.brand_id}`, {
                validateStatus: function (status) {
                    return status === 404 // treating the 404 as a "good" status code, so axios does not fail the request
                }
            })
            .catch(error => {
                console.error(error)
            })

        if (!response) {
            assert.fail('Request failed')
        }

        assert.equal(response.status, 404)
    })
