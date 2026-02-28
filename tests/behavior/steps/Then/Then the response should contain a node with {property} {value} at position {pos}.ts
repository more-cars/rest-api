import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import type {ApiResponse} from "../../lib/ApiResponse"

Then('the response should contain a node with {string} {string} at position {int}',
    (property: string, propertyValue: string, position: number) => {
        const response = world.recallResponse() as ApiResponse
        const data = response.body.data

        assert.equal(data[position - 1].data[property], propertyValue)
    })
