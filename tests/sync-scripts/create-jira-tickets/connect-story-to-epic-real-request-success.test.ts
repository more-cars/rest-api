import {expect, test} from "vitest"
import {connectStoryToEpic} from "../../../ticket-generator/lib/connectStoryToEpic"

test.skip('Connecting a "story" to an "epic" in Jira - real request - success', async () => {
    const response = await connectStoryToEpic('MCA-434', 'MCA-201')

    expect(response)
        .toEqual(undefined)
})
