import {CreateLapTimeInput} from "../types/CreateLapTimeInput"
import {InputLapTimeCreate} from "../../../../db/nodes/lap-times/types/InputLapTimeCreate"

export function convertInputData(data: CreateLapTimeInput): InputLapTimeCreate {
    return {
        time: data.time,
        driver_name: data.driver_name,
        date: data.date,
    } satisfies InputLapTimeCreate
}
