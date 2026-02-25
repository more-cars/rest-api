import type {RacingSeriesNode as ModelRacingSeriesNode} from "../../../models/node-types/racing-series/types/RacingSeriesNode"
import type {RacingSeriesNode} from "./types/RacingSeriesNode"
import {ControllerNodeType} from "../../types/ControllerNodeType"

export function convertRacingSeriesModelNodeToControllerNode(modelNode: ModelRacingSeriesNode): RacingSeriesNode {
    return {
        node_type: ControllerNodeType.RacingSeries,
        fields: {
            id: modelNode.attributes.id,
            name: modelNode.attributes.name,
            short_name: modelNode.attributes.short_name ?? null,
            founded: modelNode.attributes.founded ?? null,
            defunct: modelNode.attributes.defunct ?? null,
            organized_by: modelNode.attributes.organized_by ?? null,
            vehicle_type: modelNode.attributes.vehicle_type ?? null,
            created_at: modelNode.attributes.created_at,
            updated_at: modelNode.attributes.updated_at,
        },
    } satisfies RacingSeriesNode
}
