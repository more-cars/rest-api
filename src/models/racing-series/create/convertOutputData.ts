import {RacingSeriesNode as RacingSeriesNodeInput} from "../../../db/nodes/racing-series/types/RacingSeriesNode"
import {RacingSeriesNode} from "../types/RacingSeriesNode"

export function convertOutputData(data: RacingSeriesNodeInput): RacingSeriesNode {
    return {
        id: data.id,
        name: data.name,
        short_name: data.short_name,
        founded: data.founded,
        defunct: data.defunct,
        organized_by: data.organized_by,
        vehicle_type: data.vehicle_type,
        created_at: data.created_at,
        updated_at: data.updated_at,
    } as RacingSeriesNode
}
