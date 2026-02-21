import {CreateGamingPlatformInput} from "../types/CreateGamingPlatformInput"
import {InputGamingPlatformCreate} from "../../../../db/nodes/gaming-platforms/types/InputGamingPlatformCreate"

export function convertInputData(data: CreateGamingPlatformInput): InputGamingPlatformCreate {
    return {
        name: data.name,
        release_year: data.release_year,
        manufacturer: data.manufacturer,
    } satisfies InputGamingPlatformCreate
}
