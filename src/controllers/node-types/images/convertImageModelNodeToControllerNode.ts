import type {ImageNode as ModelImageNode} from "../../../models/node-types/images/types/ImageNode"
import type {ImageNode} from "./types/ImageNode"
import {ControllerNodeType} from "../../types/ControllerNodeType"

export function convertImageModelNodeToControllerNode(modelNode: ModelImageNode): ImageNode {
    return {
        node_type: ControllerNodeType.Image,
        fields: {
            id: modelNode.attributes.id,

            external_id: modelNode.attributes.external_id,
            image_provider: modelNode.attributes.image_provider,

            name: modelNode.attributes.name,
            description: modelNode.attributes.description ?? null,
            creator: modelNode.attributes.creator,
            license: modelNode.attributes.license,
            tags: modelNode.attributes.tags ?? null,
            source: modelNode.attributes.source,
            image_url_original: modelNode.attributes.image_url_original,
            image_url_xxl: modelNode.attributes.image_url_xxl ?? null,
            image_url_xl: modelNode.attributes.image_url_xl ?? null,
            image_url_l: modelNode.attributes.image_url_l ?? null,
            image_url_m: modelNode.attributes.image_url_m ?? null,
            image_url_s: modelNode.attributes.image_url_s ?? null,
            image_url_xs: modelNode.attributes.image_url_xs ?? null,

            created_at: modelNode.attributes.created_at,
            updated_at: modelNode.attributes.updated_at,
        },
    } satisfies ImageNode
}
