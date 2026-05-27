import {Then} from "@cucumber/cucumber"
import assert from "assert"
import moment from "moment/moment"
import {ResponseManager} from "../../lib/ResponseManager"

Then('the property {string} in the response should be an ISO 8601 formatted timestamp',
    (key: string) => {
        const response = ResponseManager.getPreviousResponse()
        const data = response.body.data

        assert.equal(typeof data, "object")
        assert(moment(data[key]).isValid(), `"Invalid timestamp`)
    })
