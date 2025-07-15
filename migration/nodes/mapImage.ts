import {Node} from "neo4j-driver"
import {InputImageCreate} from "../../src/db/nodes/images/types/InputImageCreate"

export function mapImage(node: Node): InputImageCreate {
    return {
        image_provider: node.properties.image_platform ? node.properties.image_platform : 'MISSING',
        external_id: node.properties.image_id ? node.properties.image_id : 'MISSING',
        name: node.properties.name ? node.properties.name : 'MISSING',
        description: node.properties.description,
        creator: node.properties.author ? node.properties.author : 'MISSING',
        license: node.properties.license ? node.properties.license : 'MISSING',
        tags: node.properties.tags,
        source: node.properties.origin ? node.properties.origin : 'MISSING',
        image_url_original: node.properties.source ? node.properties.source : 'MISSING',
        image_url_xxl: node.properties.size_xxl,
        image_url_xl: node.properties.size_xl,
        image_url_l: node.properties.size_l,
        image_url_m: node.properties.size_m,
        image_url_s: node.properties.size_s,
        image_url_xs: node.properties.size_xs,
    }
}