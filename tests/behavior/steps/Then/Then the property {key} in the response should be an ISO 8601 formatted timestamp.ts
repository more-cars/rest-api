import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import moment from "moment/moment"
import type {ApiResponse} from "../../lib/ApiResponse"

Then('the property {string} in the response should be an ISO 8601 formatted timestamp',
    (key: string) => {
        const response = world.recallResponse() as ApiResponse
        const data = response.body.data

        assert.equal(typeof data, "object")
        assert(moment(data[key]).isValid(), `"Invalid timestamp`)
    })
