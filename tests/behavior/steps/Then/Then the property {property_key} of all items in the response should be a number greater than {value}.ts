import {Then, world} from "@cucumber/cucumber"
import assert from "assert"

Then('the property {string} of all items in the response should be a number greater than {int}',
    (key: string, value: string) => {
        const responseData = world.recallResponse().data.data

        responseData.forEach((item: any) => {
            assert.equal(parseInt(item.data[key]) > parseInt(value), true, `"${item.data[key]}" is not greater than "${value}"`)
        })
    })
