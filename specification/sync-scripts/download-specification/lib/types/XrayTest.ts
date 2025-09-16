export type XrayTest = {
    gherkin: string
    jira: {
        key: string
        summary: string
        issuelinks: {
            outwardIssue: {
                key: string
            }
        }[]
        labels: string[]
        created: string
        updated: string
    }
}
