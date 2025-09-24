import {NodeTypeLabel} from "../../src/db/NodeTypeLabel"
import type {NodeTypeLabelOld} from "./types/NodeTypeLabelOld"

export const NodeTypeMapping = new Map<NodeTypeLabel, NodeTypeLabelOld>([
    [NodeTypeLabel.Company, 'company'],
    [NodeTypeLabel.Brand, 'brand'],
    [NodeTypeLabel.CarModel, 'carmodel'],
    [NodeTypeLabel.Image, 'image'],
])
