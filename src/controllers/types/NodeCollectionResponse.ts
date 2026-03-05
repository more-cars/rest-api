import type {NodeResponse} from "./NodeResponse"

export type NodeCollectionResponse = {
    data: NodeResponse[]
    meta: {
        total: number
    }
}
