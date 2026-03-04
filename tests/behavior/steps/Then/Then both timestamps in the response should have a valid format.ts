import {Then} from "@cucumber/cucumber"
import assert from "assert"
import moment from "moment/moment"
import {ResponseManager} from "../../lib/ResponseManager"

Then('both timestamps in the response should have a valid format',
    () => {
        const response = ResponseManager.getPreviousResponse()
        const data = response.body

        assert(moment(data.created_at).isValid(), `"${data.created_at}" is not a valid timestamp`)
        assert(moment(data.updated_at).isValid(), `"${data.updated_at}" is not a valid timestamp`)
    })
