import type {Test} from "./types/Test"
import type {AcceptanceCriterion} from "./types/AcceptanceCriterion"
import type {Story} from "./types/Story"
import type {FeatureFileData} from "./types/FeatureFileData"

export function collectFeatureFileData(test: Test, ac: AcceptanceCriterion, story: Story): FeatureFileData {
    return {
        feature: {
            id: story.id,
            title: story.title,
            user_story: story.user_story,
        },
        rule: {
            id: ac.id,
            title: ac.title,
        },
        scenario: {
            id: test.id,
            title: test.title,
            type: test.gherkin.match('Examples:') ? 'scenario_outline' : 'scenario',
            gherkin: test.gherkin,
            tags: test.labels
        }
    }
}
