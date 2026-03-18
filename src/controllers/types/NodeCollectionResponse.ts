import type {NodeResponse} from "./NodeResponse"

export type NodeCollectionResponse = {
    links: {
        self: string
        first: string
        prev: string
        next: string
        last: string
    }
    meta: {
        page: {
            current: number
            size: number
            total_nodes: number
            total_pages: number
        }
    }
    data: NodeResponse[]
}
