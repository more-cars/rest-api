import {MagazineNode as MagazineNodeInput} from "../../../../db/node-types/magazines/types/MagazineNode"
import {MagazineNode} from "../types/MagazineNode"
import {ModelNodeType} from "../../../types/ModelNodeType"

export function convertMagazineDbNodeToModelNode(data: MagazineNodeInput): MagazineNode {
    return {
        node_type: ModelNodeType.Magazine,
        attributes: {
            id: data.properties.id,
            name: data.properties.name,
            founded: data.properties.founded,
            defunct: data.properties.defunct,
            focus: data.properties.focus,
            publication_frequency: data.properties.publication_frequency,
            single_copy_price: data.properties.single_copy_price,
            single_copy_price_unit: data.properties.single_copy_price_unit,
            publication_format: data.properties.publication_format,
            circulation: data.properties.circulation,
            circulation_year: data.properties.circulation_year,
            publisher: data.properties.publisher,
            issn: data.properties.issn,
            created_at: data.properties.created_at,
            updated_at: data.properties.updated_at,
        },
    } satisfies MagazineNode
}
