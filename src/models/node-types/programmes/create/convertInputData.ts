import type {ProgrammeInput} from "../types/ProgrammeInput"
import type {DbInputData} from "../../../../db/types/DbInputData"

export function convertInputData(data: ProgrammeInput): DbInputData {
    return {
        name: data.name,
        aired_from_year: data.aired_from_year,
        aired_until_year: data.aired_until_year,
        channel: data.channel,
        total_seasons: data.total_seasons,
        total_episodes: data.total_episodes,
        regular_episode_running_time: data.regular_episode_running_time,
        country_code: data.country_code,
    }
}
