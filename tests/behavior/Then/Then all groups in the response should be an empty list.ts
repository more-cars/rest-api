import {Then} from "@cucumber/cucumber"
import assert from "assert"

Then('all groups in the response should be an empty list',
    function () {
        Object.values(this.latestResponse.data).forEach(value => {
            // @ts-expect-error TS18046
            assert(value.length === 0)
        })
    })
