import {describe, expect, test, vi} from "vitest"
import {getJiraApiAuthKey} from "../../../specification/sync-scripts/lib/getJiraApiAuthKey"

describe('Get Jira API auth key', () => {
    test('missing username', () => {
        vi.stubEnv('JIRA_API_USERNAME', undefined)
        vi.stubEnv('JIRA_API_TOKEN', 'test')

        const apiToken = getJiraApiAuthKey()

        vi.unstubAllEnvs()

        expect(apiToken)
            .toBe(false)
    })

    test('missing api token', () => {
        vi.stubEnv('JIRA_API_USERNAME', 'test')
        vi.stubEnv('JIRA_API_TOKEN', undefined)

        const apiToken = getJiraApiAuthKey()

        vi.unstubAllEnvs()

        expect(apiToken)
            .toBe(false)
    })

    test('all credentials are missing', () => {
        vi.stubEnv('JIRA_API_USERNAME', undefined)
        vi.stubEnv('JIRA_API_TOKEN', undefined)

        const apiToken = getJiraApiAuthKey()

        vi.unstubAllEnvs()

        expect(apiToken)
            .toBe(false)
    })

    test('valid credentials', () => {
        vi.stubEnv('JIRA_API_USERNAME', 'test')
        vi.stubEnv('JIRA_API_TOKEN', 'test')

        const apiToken = getJiraApiAuthKey()

        vi.unstubAllEnvs()

        expect(apiToken)
            .toBe('dGVzdDp0ZXN0')
    })
})
