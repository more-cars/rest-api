import {NodeTypeLabel} from "../../src/db/NodeTypeLabel"
import {NodeTypeLabelOld} from "./types/NodeTypeLabelOld"

export const NodeTypeMapping = new Map<NodeTypeLabel, NodeTypeLabelOld>([
    [NodeTypeLabel.Company, NodeTypeLabelOld.Company],
    [NodeTypeLabel.Brand, NodeTypeLabelOld.Brand],
    [NodeTypeLabel.CarModel, NodeTypeLabelOld.CarModel],
    [NodeTypeLabel.CarModelVariant, NodeTypeLabelOld.CarModelVariant],
    [NodeTypeLabel.RaceTrack, NodeTypeLabelOld.RaceTrack],
    [NodeTypeLabel.TrackLayout, NodeTypeLabelOld.TrackLayout],
    [NodeTypeLabel.RacingSeries, NodeTypeLabelOld.RacingSeries],
    [NodeTypeLabel.RacingEvent, NodeTypeLabelOld.RacingEvent],
    [NodeTypeLabel.RacingSession, NodeTypeLabelOld.RacingSession],
    [NodeTypeLabel.SessionResult, NodeTypeLabelOld.SessionResult],
    [NodeTypeLabel.LapTime, NodeTypeLabelOld.LapTime],
    [NodeTypeLabel.Image, NodeTypeLabelOld.Image],
])
