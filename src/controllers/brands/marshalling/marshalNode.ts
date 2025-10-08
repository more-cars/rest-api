import {BrandResponse} from "../types/BrandResponse"
import {BrandNode} from "../../../models/brands/types/BrandNode"

export function marshalNode(node: BrandNode) {
    return {
        id: node.id,
        name: node.name,
        full_name: node.full_name ?? null,
        founded: node.founded ?? null,
        defunct: node.defunct ?? null,
        wmi: node.wmi ?? null,
        hsn: node.hsn ?? null,
        created_at: node.created_at,
        updated_at: node.updated_at,
    } as BrandResponse
}
