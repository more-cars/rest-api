import type {TicketType} from "./TicketType"
import type {Epic} from "./Epic"
import type {Story} from "./Story"
import type {AcceptanceCriterion} from "./AcceptanceCriterion"
import type {Test} from "./Test"

export type ReferenceTicket = {
    type: TicketType
    id: string
    sub_path: string
    data: Epic | Story | AcceptanceCriterion | Test
}
