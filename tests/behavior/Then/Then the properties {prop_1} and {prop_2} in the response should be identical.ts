import {Then, world} from "@cucumber/cucumber"
import assert from "assert"

Then('the properties {string} and {string} in the response should be identical',
    (property_1: string, property_2: string) => {
        const responseData = world.recallResponse().data

        assert.equal(
            responseData[property_1],
            responseData[property_2],
            `"${responseData[property_1]}" and "${responseData[property_2]}" are not identical`
        )
    })
