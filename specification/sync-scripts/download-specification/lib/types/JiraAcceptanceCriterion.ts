export type JiraAcceptanceCriterion = {
    key: string
    fields: {
        parent: {
            key: string
        }
        summary: string
        description: object
        created: string
        updated: string
    }
}
