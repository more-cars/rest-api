import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import type {ApiResponse} from "../../lib/ApiResponse"

Then('the request should not be redirected',
    () => {
        const response = world.recallResponse() as ApiResponse

        assert.ok(![301, 302, 303, 307, 308].includes(response.status_code))
        assert.ok(!('location' in response.headers))
    })
