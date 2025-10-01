import {NodeTypeLabel} from "../../src/db/NodeTypeLabel"

// This considers only the outgoing relationships (has-relationships, not the belongs-to relationships).
export function getAllPotentialPartnerNodeTypes() {
    return new Map<NodeTypeLabel, NodeTypeLabel[]>([
        [NodeTypeLabel.Company, [
            NodeTypeLabel.Brand,
            NodeTypeLabel.Image,
        ]],
        [NodeTypeLabel.Brand, [
            NodeTypeLabel.CarModel,
            NodeTypeLabel.Image,
        ]],
        [NodeTypeLabel.CarModel, [
            NodeTypeLabel.Image,
        ]],
    ])
}
