import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import type {ApiResponse} from "../../lib/ApiResponse"

Then('the property {string} in the response should be a number lesser than {int}',
    (key: string, value: string) => {
        const response = world.recallResponse() as ApiResponse
        const data = response.body.data

        assert.equal(parseInt(data[key]) < parseInt(value), true, `"${data[key]}" is not lesser than "${value}"`)
    })
