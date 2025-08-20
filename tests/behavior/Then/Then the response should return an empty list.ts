import {Then, world} from "@cucumber/cucumber"
import assert from "assert"

Then('the response should return an empty list',
    () => {
        assert.equal(world.recallResponse().data.length, 0)
    })
