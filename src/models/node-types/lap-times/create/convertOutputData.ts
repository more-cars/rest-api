import {LapTimeNode as LapTimeNodeInput} from "../../../../db/nodes/lap-times/types/LapTimeNode"
import {LapTimeNode} from "../types/LapTimeNode"

export function convertOutputData(data: LapTimeNodeInput): LapTimeNode {
    return {
        id: data.properties.id,
        time: data.properties.time,
        driver_name: data.properties.driver_name,
        date: data.properties.date,
        created_at: data.properties.created_at,
        updated_at: data.properties.updated_at,
    } as LapTimeNode
}
