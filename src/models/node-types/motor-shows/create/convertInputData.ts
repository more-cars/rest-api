import {CreateMotorShowInput} from "../types/CreateMotorShowInput"
import {InputMotorShowCreate} from "../../../../db/node-types/motor-shows/types/InputMotorShowCreate"

export function convertInputData(data: CreateMotorShowInput): InputMotorShowCreate {
    return {
        name: data.name,
        date_from: data.date_from,
        date_until: data.date_until,
        location: data.location,
        target_audience: data.target_audience,
        focus: data.focus,
    } satisfies InputMotorShowCreate
}
