import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import moment from "moment/moment"

Then('the property {string} in the response should be an ISO 8601 formatted timestamp',
    (key: string) => {
        const value = world.recallResponse().data[key]
        assert(moment(value).isValid(), `"${value}" is not a valid timestamp`)
    })
