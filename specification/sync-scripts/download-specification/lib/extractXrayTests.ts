import type {XrayTest} from "./types/XrayTest"
import type {Test} from "./types/Test"

export function extractXrayTests(tests: Array<XrayTest>): Array<Test> {
    const extractedTests: Array<Test> = []

    tests.forEach(xrayTest => {
        extractedTests.push({
            id: xrayTest.jira.key,
            parent_id: xrayTest.jira.issuelinks[0].outwardIssue.key,
            title: xrayTest.jira.summary,
            gherkin: xrayTest.gherkin,
            labels: xrayTest.jira.labels,
            created_at: xrayTest.jira.created,
            updated_at: xrayTest.jira.updated,
        } as Test)
    })

    return extractedTests
}
