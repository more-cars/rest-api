import {BrandNode} from "../../../models/brands/types/BrandNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import {BrandResponse} from "../types/BrandResponse"

export function marshalNode(node: BrandNode) {
    return marshalSingleNode({
        id: node.id,
        name: node.name,
        full_name: node.full_name ?? null,
        founded: node.founded ?? null,
        defunct: node.defunct ?? null,
        wmi: node.wmi ?? null,
        hsn: node.hsn ?? null,
        created_at: node.created_at,
        updated_at: node.updated_at,
    }) as BrandResponse
}
