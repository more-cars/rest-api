import {CreateGamingPlatformInput} from "../types/CreateGamingPlatformInput"
import {InputGamingPlatformCreate} from "../../../../db/nodes/gaming-platforms/types/InputGamingPlatformCreate"

export function convertInputData(data: CreateGamingPlatformInput): InputGamingPlatformCreate {
    const convertedData: InputGamingPlatformCreate = {
        name: data.name,
        release_year: data.release_year,
        manufacturer: data.manufacturer,
    }

    return convertedData
}
