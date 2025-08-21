import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import moment from "moment/moment"

Then('the property {string} in the response should be an ISO 8601 formatted timestamp',
    (key: string) => {
        assert.equal(typeof world.recallResponse().data, "object")
        assert(moment(world.recallResponse().data[key]).isValid(), `"Invalid timestamp`)
    })
