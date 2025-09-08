import {expect, test} from "vitest"
import {
    connectTestToAcceptanceCriterion
} from "../../../specification/sync-scripts/lib/connectTestToAcceptanceCriterion"

test.skip('Connecting a "test" to an "acceptance criterion" in Jira - real request - success', async () => {
    const response = await connectTestToAcceptanceCriterion('MCA-436', 'MCA-435')

    expect(response)
        .toEqual(undefined)
})
