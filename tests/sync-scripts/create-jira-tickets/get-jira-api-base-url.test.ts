import {describe, expect, test, vi} from "vitest"
import {getJiraApiBaseUrl} from "../../../specification/sync-scripts/lib/getJiraApiBaseUrl"

describe('Get Jira API base url', () => {
    test('missing Jira Domain', () => {
        vi.stubEnv('JIRA_DOMAIN', undefined)

        const url = getJiraApiBaseUrl()

        vi.unstubAllEnvs()

        expect(url)
            .toBe(false)
    })

    test('valid Jira Domain', () => {
        vi.stubEnv('JIRA_DOMAIN', 'https://test.atlassian.net')

        const url = getJiraApiBaseUrl()

        vi.unstubAllEnvs()

        expect(url)
            .toBe('https://test.atlassian.net/rest/api/3/')
    })
})
