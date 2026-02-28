import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import type {ApiResponse} from "../../lib/ApiResponse"

Then('the response should return an empty list',
    () => {
        const response = world.recallResponse() as ApiResponse
        const data = response.body.data

        assert.equal(data.length, 0)
    })
