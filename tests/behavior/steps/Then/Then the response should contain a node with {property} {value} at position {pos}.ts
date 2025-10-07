import {Then, world} from "@cucumber/cucumber"
import assert from "assert"

Then('the response should contain a node with {string} {string} at position {int}',
    (property: string, propertyValue: string, position: number) => {
        const responseData = world.recallResponse().data

        assert.equal(responseData[position - 1][property], propertyValue)
    })
