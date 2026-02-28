import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import type {ApiResponse} from "../../lib/ApiResponse"

Then('all groups in the response should be an empty list',
    () => {
        const response = world.recallResponse() as ApiResponse
        const data = response.body.data

        assert.equal(data.companies.data.length, 0)
        assert.equal(data.brands.data.length, 0)
        assert.equal(data.car_models.data.length, 0)
    })
