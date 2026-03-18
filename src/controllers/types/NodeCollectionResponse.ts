import type {NodeResponse} from "./NodeResponse"

export type NodeCollectionResponse = {
    data: NodeResponse[]
    meta: {
        page: {
            total_nodes: number
        }
    }
}
