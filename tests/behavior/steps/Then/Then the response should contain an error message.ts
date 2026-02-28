import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import type {ApiResponse} from "../../lib/ApiResponse"

Then('the response should contain an error message', function () {
    const response = world.recallResponse() as ApiResponse
    const data = response.body

    assert(typeof data === "string", `"error message is not a string`)
})
