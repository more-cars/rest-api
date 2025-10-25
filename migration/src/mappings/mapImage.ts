import {Node} from "neo4j-driver"
import {InputImageCreate} from "../../../src/db/nodes/images/types/InputImageCreate"

export function mapImage(oldNode: Node): InputImageCreate {
    return {
        image_provider: oldNode.properties.image_platform ? oldNode.properties.image_platform : 'MISSING',
        external_id: oldNode.properties.image_id ? oldNode.properties.image_id : 'MISSING',
        name: oldNode.properties.name ? oldNode.properties.name : 'MISSING',
        description: oldNode.properties.description,
        creator: oldNode.properties.author ? oldNode.properties.author : 'MISSING',
        license: oldNode.properties.license ? oldNode.properties.license : 'MISSING',
        tags: oldNode.properties.tags,
        source: oldNode.properties.origin ? oldNode.properties.origin : 'MISSING',
        image_url_original: oldNode.properties.source ? oldNode.properties.source : 'MISSING',
        image_url_xxl: oldNode.properties.size_xxl,
        image_url_xl: oldNode.properties.size_xl,
        image_url_l: oldNode.properties.size_l,
        image_url_m: oldNode.properties.size_m,
        image_url_s: oldNode.properties.size_s,
        image_url_xs: oldNode.properties.size_xs,
    }
}