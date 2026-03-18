import type {NodeResponse} from "./NodeResponse"

export type NodeCollectionResponse = {
    data: NodeResponse[]
    meta: {
        page: {
            size: number
            total_nodes: number
        }
    }
}
