import {DbNode} from "../../../types/DbNode"
import {DbNodeType} from "../../../types/DbNodeType"

export interface BrandNode extends DbNode {
    node_type: DbNodeType.Brand,
    properties: {
        id: number
        created_at: string
        updated_at: string

        name: string
        full_name: string | null
        founded: number | null
        defunct: number | null
        wmi: string | null
        hsn: string | null
    }
}
