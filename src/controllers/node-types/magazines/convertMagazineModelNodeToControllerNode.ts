import type {MagazineNode as ModelMagazineNode} from "../../../models/node-types/magazines/types/MagazineNode"
import type {MagazineNode} from "./types/MagazineNode"
import {ControllerNodeType} from "../../types/ControllerNodeType"

export function convertMagazineModelNodeToControllerNode(modelNode: ModelMagazineNode): MagazineNode {
    return {
        node_type: ControllerNodeType.Magazine,
        fields: {
            id: modelNode.attributes.id,
            name: modelNode.attributes.name,
            founded: modelNode.attributes.founded ?? null,
            defunct: modelNode.attributes.defunct ?? null,
            focus: modelNode.attributes.focus ?? null,
            publication_frequency: modelNode.attributes.publication_frequency ?? null,
            single_copy_price: modelNode.attributes.single_copy_price ?? null,
            single_copy_price_unit: modelNode.attributes.single_copy_price_unit ?? null,
            publication_format: modelNode.attributes.publication_format ?? null,
            circulation: modelNode.attributes.circulation ?? null,
            circulation_year: modelNode.attributes.circulation_year ?? null,
            publisher: modelNode.attributes.publisher ?? null,
            issn: modelNode.attributes.issn ?? null,
            created_at: modelNode.attributes.created_at,
            updated_at: modelNode.attributes.updated_at,
        },
    } satisfies MagazineNode
}
