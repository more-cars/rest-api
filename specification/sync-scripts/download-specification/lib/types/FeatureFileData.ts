export type FeatureFileData = {
    feature: {
        id: string
        title: string
        user_story: string
    }
    rule: {
        id: string
        title: string
    }
    scenario: {
        id: string
        title: string
        type: 'scenario' | 'scenario_outline'
        gherkin: string
        tags: string[]
    }
}
