import type {Story} from "./Story"
import type {AcceptanceCriterion} from "./AcceptanceCriterion"
import type {Test} from "./Test"

export type TicketTree = {
    epic: {
        jiraId: string
        stories: Array<Story & {
            acceptanceCriteria: Array<AcceptanceCriterion & {
                tests: Array<Test>
            }>
        }>
    }
}
