import type {ModelNodeType} from "./ModelNodeType"

export type ModelNode = {
    node_type: ModelNodeType,
    attributes: {
        id: number
        created_at: string
        updated_at: string
    }
}
