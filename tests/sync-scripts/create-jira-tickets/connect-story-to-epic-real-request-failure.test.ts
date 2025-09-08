import {expect, test} from "vitest"
import {connectStoryToEpic} from "../../../specification/sync-scripts/lib/connectStoryToEpic"

test.skip('Connecting a "story" to an "epic" in Jira - real request - failure', async () => {
    await expect(connectStoryToEpic('TEST-2', 'TEST-1'))
        .rejects
        .toThrow(Error)
})
