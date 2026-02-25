import type {CompanyNode as ModelCompanyNode} from "../../../models/node-types/companies/types/CompanyNode"
import type {CompanyNode} from "./types/CompanyNode"
import {ControllerNodeType} from "../../types/ControllerNodeType"

export function convertCompanyModelNodeToControllerNode(modelNode: ModelCompanyNode): CompanyNode {
    return {
        node_type: ControllerNodeType.Company,
        fields: {
            id: modelNode.attributes.id,
            name: modelNode.attributes.name,
            founded: modelNode.attributes.founded ?? null,
            defunct: modelNode.attributes.defunct ?? null,
            headquarters_location: modelNode.attributes.headquarters_location ?? null,
            legal_headquarters_location: modelNode.attributes.legal_headquarters_location ?? null,
            created_at: modelNode.attributes.created_at,
            updated_at: modelNode.attributes.updated_at,
        },
    } satisfies CompanyNode
}
