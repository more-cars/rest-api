import type {TicketType} from "./TicketType"

export type ReferenceTicket = {
    type: TicketType
    id: string
    sub_path: string
}
