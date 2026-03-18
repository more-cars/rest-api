import type {NodeResponse} from "./NodeResponse"

export type NodeCollectionResponse = {
    data: NodeResponse[]
    meta: {
        page: {
            current: number
            size: number
            total_nodes: number
            total_pages: number
        }
    }
}
