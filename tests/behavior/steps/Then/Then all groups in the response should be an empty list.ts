import {Then, world} from "@cucumber/cucumber"
import assert from "assert"

Then('all groups in the response should be an empty list',
    () => {
        assert.equal(world.recallResponse().data.data.companies.data.length, 0)
        assert.equal(world.recallResponse().data.data.brands.data.length, 0)
        assert.equal(world.recallResponse().data.data.car_models.data.length, 0)
    })
