import {ControllerNodeType} from "../../../types/ControllerNodeType"

export type BrandNode = {
    node_type: ControllerNodeType.Brand
    fields: {
        id: number

        name: string
        full_name: string | null
        founded: number | null
        defunct: number | null
        wmi: string | null
        hsn: string | null

        created_at: string
        updated_at: string
    }
}
