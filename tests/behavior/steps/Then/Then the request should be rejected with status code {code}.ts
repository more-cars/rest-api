import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import type {ApiResponse} from "../../lib/ApiResponse"

Then('the request should be rejected with status code {int}',
    (statusCode: number) => {
        const response = world.recallResponse() as ApiResponse

        assert.equal(response.status_code, statusCode)
    })
