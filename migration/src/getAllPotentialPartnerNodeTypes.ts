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
            NodeTypeLabel.CarModel,
            NodeTypeLabel.Image,
        ]],
        [NodeTypeLabel.RaceTrack, [
            NodeTypeLabel.TrackLayout,
            NodeTypeLabel.Image,
        ]],
        [NodeTypeLabel.TrackLayout, [
            NodeTypeLabel.Image,
        ]],
        [NodeTypeLabel.RacingSeries, [
            NodeTypeLabel.RacingEvent,
            NodeTypeLabel.Image,
        ]],
        [NodeTypeLabel.RacingEvent, [
            NodeTypeLabel.RacingEvent,
            NodeTypeLabel.RaceTrack,
            NodeTypeLabel.TrackLayout,
            NodeTypeLabel.Image,
        ]],
    ])
}
