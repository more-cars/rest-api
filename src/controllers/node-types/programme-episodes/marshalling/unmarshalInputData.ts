import {CreateProgrammeEpisodeRawInput} from "../types/CreateProgrammeEpisodeRawInput"

// @ts-expect-error We cannot set a data type because we don't know what data the user actually provided.
export function unmarshalInputData(data): CreateProgrammeEpisodeRawInput {
    return {
        title: data?.title,
        season_number: data?.season_number,
        season_episode_number: data?.season_episode_number,
        original_air_date: data?.original_air_date,
        duration: data?.duration,
    } satisfies CreateProgrammeEpisodeRawInput
}
