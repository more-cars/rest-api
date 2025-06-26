import {Then} from "@cucumber/cucumber"
import assert from "assert"
import moment from "moment/moment"

Then('the property {string} in the response should be an ISO 8601 formatted timestamp',
    function (key: string) {
        const value = this.latestResponse.data[key]
        assert(moment(value).isValid(), `"${value}" is not a valid timestamp`)
    })
