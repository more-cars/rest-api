import {CreateLapTimeInput} from "../types/CreateLapTimeInput"
import {InputLapTimeCreate} from "../../../../db/nodes/lap-times/types/InputLapTimeCreate"

export function convertInputData(data: CreateLapTimeInput): InputLapTimeCreate {
    const convertedData: InputLapTimeCreate = {
        time: data.time,
        driver_name: data.driver_name,
        date: data.date,
    }

    return convertedData
}
