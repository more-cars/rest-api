import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"

Then('the request should not be redirected',
    () => {
        const response = ResponseManager.getPreviousResponse()

        assert.ok(![301, 302, 303, 307, 308].includes(response.status_code))
        assert.ok(!('location' in response.headers))
    })
