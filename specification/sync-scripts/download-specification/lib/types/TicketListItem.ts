import type {TicketType} from "./TicketType"

export type TicketListItem = {
    type: TicketType
    id: string
    sub_path: string
}
