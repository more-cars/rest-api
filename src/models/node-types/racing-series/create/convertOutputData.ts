import {RacingSeriesNode as RacingSeriesNodeInput} from "../../../../db/nodes/racing-series/types/RacingSeriesNode"
import {RacingSeriesNode} from "../types/RacingSeriesNode"

export function convertOutputData(data: RacingSeriesNodeInput): RacingSeriesNode {
    return {
        id: data.properties.id,
        name: data.properties.name,
        short_name: data.properties.short_name,
        founded: data.properties.founded,
        defunct: data.properties.defunct,
        organized_by: data.properties.organized_by,
        vehicle_type: data.properties.vehicle_type,
        created_at: data.properties.created_at,
        updated_at: data.properties.updated_at,
    } as RacingSeriesNode
}
