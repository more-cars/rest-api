import {Then, world} from "@cucumber/cucumber"
import assert from "assert"

Then('the response should contain an error message', function () {
    const responseData = world.recallResponse().data

    assert(typeof responseData === "string", `"error message is not a string`)
})
