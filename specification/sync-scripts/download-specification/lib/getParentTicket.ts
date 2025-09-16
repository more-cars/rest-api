import type {ReferenceTicket} from "./types/ReferenceTicket"

export function getParentTicket(ticketList: Array<ReferenceTicket>, parentId: string): ReferenceTicket {
    const parentTicket = ticketList.find((item) => item.id === parentId)

    if (!parentTicket) {
        return {
            type: 'unknown',
            id: '',
            sub_path: '/'
        }
    }

    return parentTicket
}
