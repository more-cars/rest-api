export type JiraAcceptanceCriterion = {
    key: string
    fields: {
        parent: {
            key: string
        }
        summary: string
        description: object
        fixVersions: {
            name: string
        }[]
        created: string
        updated: string
    }
}
