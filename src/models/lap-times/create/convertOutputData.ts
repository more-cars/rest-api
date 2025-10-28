import {LapTimeNode as LapTimeNodeInput} from "../../../db/nodes/lap-times/types/LapTimeNode"
import {LapTimeNode} from "../types/LapTimeNode"

export function convertOutputData(data: LapTimeNodeInput): LapTimeNode {
    return {
        id: data.id,
        time: data.time,
        driver_name: data.driver_name,
        date: data.date,
        created_at: data.created_at,
        updated_at: data.updated_at,
    } as LapTimeNode
}
