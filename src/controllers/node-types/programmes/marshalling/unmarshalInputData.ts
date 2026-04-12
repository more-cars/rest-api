import {CreateProgrammeRawInput} from "../types/CreateProgrammeRawInput"

// @ts-expect-error We cannot set a data type because we don't know what data the user actually provided.
export function unmarshalInputData(data): CreateProgrammeRawInput {
    return {
        name: data?.name,
        aired_from_year: data?.aired_from_year,
        aired_until_year: data?.aired_until_year,
        channel: data?.channel,
        total_seasons: data?.total_seasons,
        total_episodes: data?.total_episodes,
        regular_episode_running_time: data?.regular_episode_running_time,
        country_code: data?.country_code,
    } satisfies CreateProgrammeRawInput
}
