import {Then, world} from "@cucumber/cucumber"
import assert from "assert"

Then('the response should return with status code {int}',
    (statusCode: number) => {
        assert.equal(world.recallResponse().status, statusCode)
    })
