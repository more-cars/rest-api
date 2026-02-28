import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"

Then('all groups in the response should be an empty list',
    () => {
        const response = ResponseManager.getPreviousResponse()
        const data = response.body.data

        assert.equal(data.companies.data.length, 0)
        assert.equal(data.brands.data.length, 0)
        assert.equal(data.car_models.data.length, 0)
    })
