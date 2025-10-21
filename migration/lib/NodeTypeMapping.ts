import {NodeTypeLabel} from "../../src/db/NodeTypeLabel"
import {NodeTypeLabelOld} from "./types/NodeTypeLabelOld"

export const NodeTypeMapping = new Map<NodeTypeLabel, NodeTypeLabelOld>([
    [NodeTypeLabel.Company, NodeTypeLabelOld.Company],
    [NodeTypeLabel.Brand, NodeTypeLabelOld.Brand],
    [NodeTypeLabel.CarModel, NodeTypeLabelOld.CarModel],
    [NodeTypeLabel.RaceTrack, NodeTypeLabelOld.RaceTrack],
    [NodeTypeLabel.TrackLayout, NodeTypeLabelOld.TrackLayout],
    [NodeTypeLabel.Image, NodeTypeLabelOld.Image],
])
