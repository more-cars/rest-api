import {InputImageCreate} from "./types/InputImageCreate"
import {ImageNode} from "./types/ImageNode"
import {createDbNode} from "../createDbNode"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToImageNode} from "./mapDbNodeToImageNode"
import {getCypherQueryTemplate} from "../../getCypherQueryTemplate"
import {escapeSingleQuotes} from "../escapeSingleQuotes"

export async function createNode(data: InputImageCreate): Promise<ImageNode> {
    const node = await createDbNode(NodeTypeLabel.Image, createNodeQuery(data))

    return mapDbNodeToImageNode(node)
}

export function createNodeQuery(data: InputImageCreate) {
    let template = getCypherQueryTemplate('nodes/images/_cypher/createNode.cypher')
        .trim()

    template = template
        .replace('$image_provider', `'${escapeSingleQuotes(data.image_provider)}'`)
        .replace('$external_id', `'${escapeSingleQuotes(data.external_id)}'`)
        .replace('$name', `'${escapeSingleQuotes(data.name)}'`)
        .replace('$description', data.description ? `'${escapeSingleQuotes(data.description)}'` : 'null')
        .replace('$creator', `'${escapeSingleQuotes(data.creator)}'`)
        .replace('$license', `'${escapeSingleQuotes(data.license)}'`)
        .replace('$tags', data.tags ? `'${escapeSingleQuotes(data.tags)}'` : 'null')
        .replace('$source', `'${escapeSingleQuotes(data.source)}'`)
        .replace('$image_url_original', `'${escapeSingleQuotes(data.image_url_original)}'`)
        .replace('$image_url_xxl', data.image_url_xxl ? `'${escapeSingleQuotes(data.image_url_xxl)}'` : 'null')
        .replace('$image_url_xl', data.image_url_xl ? `'${escapeSingleQuotes(data.image_url_xl)}'` : 'null')
        .replace('$image_url_l', data.image_url_l ? `'${escapeSingleQuotes(data.image_url_l)}'` : 'null')
        .replace('$image_url_m', data.image_url_m ? `'${escapeSingleQuotes(data.image_url_m)}'` : 'null')
        .replace('$image_url_s', data.image_url_s ? `'${escapeSingleQuotes(data.image_url_s)}'` : 'null')
        .replace('$image_url_xs', data.image_url_xs ? `'${escapeSingleQuotes(data.image_url_xs)}'` : 'null')

    return template
}
