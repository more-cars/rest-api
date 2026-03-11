import {CreateProgrammeInput} from "../types/CreateProgrammeInput"
import {InputProgrammeCreate} from "../../../../db/node-types/programmes/types/InputProgrammeCreate"

export function convertInputData(data: CreateProgrammeInput): InputProgrammeCreate {
    return {
        name: data.name,
        aired_from_year: data.aired_from_year,
        aired_until_year: data.aired_until_year,
        channel: data.channel,
        total_seasons: data.total_seasons,
        total_episodes: data.total_episodes,
        regular_episode_running_time: data.regular_episode_running_time,
    } satisfies InputProgrammeCreate
}
