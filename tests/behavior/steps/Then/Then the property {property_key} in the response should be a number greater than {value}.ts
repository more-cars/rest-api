import {Then, world} from "@cucumber/cucumber"
import assert from "assert"

Then('the property {string} in the response should be a number greater than {int}',
    (key: string, value: string) => {
        const responseData = world.recallResponse().data.data

        assert.equal(parseInt(responseData[key]) > parseInt(value), true, `"${responseData[key]}" is not greater than "${value}"`)
    })
