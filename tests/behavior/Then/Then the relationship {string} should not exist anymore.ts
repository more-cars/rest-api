import {Then} from "@cucumber/cucumber"
// import {getNodeById} from "../../../src/db/car-models/getNodeById"
// import axios from "axios"
// import assert from "assert"

// TODO on hold until it is possible to request relationships via the API
Then('the relationship {string} should not exist anymore',
    async function (relationshipLabel: string) {
        // const brand = await getNodeById(this.relationship[relationshipLabel].start_node_id)
        // const carModel = await getNodeById(this.relationship[relationshipLabel].end_node_id)
        //
        // if (!brand || !carModel) {
        //     assert.ok(false)
        // }
        //
        // const response = await axios
        //     .get(`${process.env.API_URL}/car-models/${carModel.id}/belongs-to-brand/${brand.id}`)
        //     .catch(error => {
        //         console.error(error.toJSON())
        //     })
        //
        // assert.equal(response.status, 404)
    })
