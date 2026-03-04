import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"

Then('both timestamps in the response should be identical',
    () => {
        const response = ResponseManager.getPreviousResponse()
        const data = response.body

        assert.equal(
            data.created_at,
            data.updated_at,
            `"${data.created_at}" and "${data.updated_at}" are not identical`,
        )
    })
