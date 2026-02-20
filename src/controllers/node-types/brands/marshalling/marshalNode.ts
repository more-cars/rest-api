import {BrandNode} from "../../../../models/node-types/brands/types/BrandNode"
import {marshalSingleNode} from "../../../nodes/marshalSingleNode"
import {BrandResponse} from "../types/BrandResponse"

export function marshalNode(node: BrandNode) {
    return marshalSingleNode({
        id: node.attributes.id,
        name: node.attributes.name,
        full_name: node.attributes.full_name ?? null,
        founded: node.attributes.founded ?? null,
        defunct: node.attributes.defunct ?? null,
        wmi: node.attributes.wmi ?? null,
        hsn: node.attributes.hsn ?? null,
        created_at: node.attributes.created_at,
        updated_at: node.attributes.updated_at,
    }) as BrandResponse
}
