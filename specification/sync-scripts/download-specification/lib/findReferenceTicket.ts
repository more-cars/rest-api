import type {ReferenceTicket} from "./types/ReferenceTicket"

export function findReferenceTicket(ticketId: string, tickets: Array<ReferenceTicket>): ReferenceTicket | null {
    const ref = tickets.find((item) => item.id === ticketId)

    if (!ref) {
        return null
    }

    return ref
}
