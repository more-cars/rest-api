import {Then, world} from "@cucumber/cucumber"
import assert from "assert"

Then('the response should return a collection of {int} CAR MODELs',
    (amount: number) => {
        assert.equal(world.recallResponse().data.length, amount)
    })
