import type {ProgrammeEpisodeInput} from "../types/ProgrammeEpisodeInput"
import type {DbInputData} from "../../../../db/types/DbInputData"

export function convertInputData(data: ProgrammeEpisodeInput): DbInputData {
    return {
        title: data.title,
        season_number: data.season_number,
        season_episode_number: data.season_episode_number,
        original_air_date: data.original_air_date,
        duration: data.duration,
    }
}
