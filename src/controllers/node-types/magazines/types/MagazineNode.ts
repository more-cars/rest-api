import {ControllerNodeType} from "../../../types/ControllerNodeType"

export type MagazineNode = {
    node_type: ControllerNodeType.Magazine
    fields: {
        id: number
        name: string
        founded: number | null
        defunct: number | null
        focus: string | null
        publication_frequency: string | null
        single_copy_price: number | null
        single_copy_price_unit: string | null
        publication_format: string | null
        circulation: number | null
        circulation_year: number | null
        publisher: string | null
        issn: string | null
        created_at: string
        updated_at: string
    }
}
