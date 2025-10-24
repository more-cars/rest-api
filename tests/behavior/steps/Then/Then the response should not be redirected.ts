import {Then, world} from "@cucumber/cucumber"
import assert from "assert"

Then('the request should not be redirected',
    () => {
        const response = world.recallResponse()

        assert.ok(![301, 302, 303, 307, 308].includes(response.status))
        assert.ok(!('location' in response.headers))
    })
