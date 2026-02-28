import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import type {ApiResponse} from "../../lib/ApiResponse"

Then('the response should contain a {string} group',
    (nodeType: string) => {
        const response = world.recallResponse() as ApiResponse
        const data = response.body.data

        const groupKey = nodeType.toLowerCase().replace(' ', '_') + 's'
        assert(groupKey in data, `Field "${groupKey}" not found in the response`)
    })
