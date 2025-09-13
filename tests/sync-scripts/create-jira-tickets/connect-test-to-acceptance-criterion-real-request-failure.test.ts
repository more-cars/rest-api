import {expect, test} from "vitest"
import {
    connectTestToAcceptanceCriterion
} from "../../../specification/sync-scripts/create-jira-tickets/lib/connectTestToAcceptanceCriterion"

test.skip('Connecting a "test" to an "acceptance criterion" in Jira - real request - failure', async () => {
    await expect(connectTestToAcceptanceCriterion('TEST-4', 'TEST-3'))
        .rejects
        .toThrow(Error)
})
