import {describe, expect, test, vi} from "vitest"
import {obtainXrayApiToken} from "../../../specification/sync-scripts/create-jira-tickets/lib/obtainXrayApiToken"

describe('Fetching Xray API token', () => {
    test('with invalid credentials', async () => {
        vi.stubEnv('XRAY_API_CLIENT_ID', 'test')
        vi.stubEnv('XRAY_API_CLIENT_SECRET', 'test')

        const apiToken = await obtainXrayApiToken()

        vi.unstubAllEnvs()

        expect(apiToken)
            .toBe(false)
    })

    test('with valid credentials', async () => {
        vi.stubEnv('XRAY_API_CLIENT_ID', process.env.XRAY_API_CLIENT_ID)
        vi.stubEnv('XRAY_API_CLIENT_SECRET', process.env.XRAY_API_CLIENT_SECRET)

        const apiToken = await obtainXrayApiToken()

        vi.unstubAllEnvs()

        expect(apiToken)
            .toHaveLength(448)
    })
})
