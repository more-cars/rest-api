import {DbNodeType} from "./DbNodeType"

export interface DbNode {
    node_type: DbNodeType,
    properties: {
        id: number
        created_at: string
        updated_at: string
    }
}
