import {CreateProgrammeEpisodeInput} from "../types/CreateProgrammeEpisodeInput"
import {InputProgrammeEpisodeCreate} from "../../../../db/node-types/programme-episodes/types/InputProgrammeEpisodeCreate"

export function convertInputData(data: CreateProgrammeEpisodeInput): InputProgrammeEpisodeCreate {
    return {
        title: data.title,
        season_number: data.season_number,
        season_episode_number: data.season_episode_number,
        original_air_date: data.original_air_date,
        duration: data.duration,
    } satisfies InputProgrammeEpisodeCreate
}
