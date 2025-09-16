export type JiraStory = {
    key: string
    fields: {
        parent: {
            key: string
        }
        summary: string
        description: object
        // user story
        customfield_10691: object
        // API Verb
        customfield_10732: {
            value: string
        }
        // API Path
        customfield_10731: string
        // Response options
        customfield_10767: {
            value: string
        }[]
        fixVersions: {
            name: string
        }[]
        created: string
        updated: string
    }
}
