import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import type {ApiResponse} from "../../lib/ApiResponse"

Then('the properties {string} and {string} in the response should be identical',
    (property_1: string, property_2: string) => {
        const response = world.recallResponse() as ApiResponse
        const data = response.body.data

        assert.equal(
            data[property_1],
            data[property_2],
            `"${data[property_1]}" and "${data[property_2]}" are not identical`
        )
    })
