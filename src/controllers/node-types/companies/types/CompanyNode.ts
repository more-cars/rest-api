import {ControllerNodeType} from "../../../nodes/types/ControllerNodeType"

export type CompanyNode = {
    node_type: ControllerNodeType.Company
    fields: {
        id: number

        name: string
        founded: number | null
        defunct: number | null
        headquarters_location: string | null
        legal_headquarters_location: string | null

        created_at: string
        updated_at: string
    }
}
