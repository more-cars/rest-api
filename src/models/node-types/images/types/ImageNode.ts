import type {ModelNode} from "../../../types/ModelNode"
import type {ModelNodeType} from "../../../types/ModelNodeType"

export interface ImageNode extends ModelNode {
    node_type: ModelNodeType.Image,
    attributes: {
        id: number

        image_provider: string
        external_id: string

        name: string,
        description: string | null,
        creator: string,
        license: string,
        tags: string | null,
        source: string,
        image_url_original: string,
        image_url_xxl: string | null,
        image_url_xl: string | null,
        image_url_l: string | null,
        image_url_m: string | null,
        image_url_s: string | null,
        image_url_xs: string | null,

        created_at: string
        updated_at: string
    }
}
