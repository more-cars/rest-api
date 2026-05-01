import {DbNodeType} from "../../../types/DbNodeType"

export type RevisionNode = {
    node_type: DbNodeType.Revision,
    properties: {
        id: number

        node_type: string
        node_id: number
        node_created_at: string
        node_updated_at: string
        [key: string]: string | number | boolean

        created_at: string
        updated_at: string
    }
}
