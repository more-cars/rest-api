import {Then, world} from "@cucumber/cucumber"
import assert from "assert"

Then('the request should be rejected with status code {int}',
    (statusCode: number) => {
        assert.equal(world.recallResponse().status, statusCode)
    })
