import {DbNodeType} from "../../../types/DbNodeType"

export type MagazineNode = {
    node_type: DbNodeType.Magazine,
    properties: {
        id: number
        created_at: string
        updated_at: string
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
    }
}
