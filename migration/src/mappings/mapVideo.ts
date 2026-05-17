import {Node} from "neo4j-driver"
import type {DbInputData} from "../../../src/db/types/DbInputData"

export function mapVideo(oldNode: Node): DbInputData {
    return {
        video_provider: oldNode.properties.video_platform,
        external_id: oldNode.properties.video_id,
        title: oldNode.properties.name,
        description: oldNode.properties.description,
        creator: oldNode.properties.creator,
        license: oldNode.properties.license,
        tags: oldNode.properties.tags,
        source: oldNode.properties.source,
        duration: oldNode.properties.duration,
        thumbnail_url_l: oldNode.properties.size_l,
        thumbnail_url_m: oldNode.properties.size_m,
        thumbnail_url_s: oldNode.properties.size_s,
        thumbnail_url_xs: oldNode.properties.size_xs,
    }
}
