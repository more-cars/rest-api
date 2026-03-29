import type {VideoNode as ModelVideoNode} from "../../../models/node-types/videos/types/VideoNode"
import type {VideoNode} from "./types/VideoNode"
import {ControllerNodeType} from "../../types/ControllerNodeType"

export function convertVideoModelNodeToControllerNode(modelNode: ModelVideoNode): VideoNode {
    return {
        node_type: ControllerNodeType.Video,
        fields: {
            id: modelNode.attributes.id,
            video_provider: modelNode.attributes.video_provider,
            external_id: modelNode.attributes.external_id,
            title: modelNode.attributes.title ?? null,
            description: modelNode.attributes.description ?? null,
            creator: modelNode.attributes.creator ?? null,
            license: modelNode.attributes.license ?? null,
            tags: modelNode.attributes.tags ?? null,
            source: modelNode.attributes.source ?? null,
            duration: modelNode.attributes.duration ?? null,
            thumbnail_url_l: modelNode.attributes.thumbnail_url_l ?? null,
            thumbnail_url_m: modelNode.attributes.thumbnail_url_m ?? null,
            thumbnail_url_s: modelNode.attributes.thumbnail_url_s ?? null,
            thumbnail_url_xs: modelNode.attributes.thumbnail_url_xs ?? null,
            created_at: modelNode.attributes.created_at,
            updated_at: modelNode.attributes.updated_at,
        },
    } satisfies VideoNode
}
