import {expect, test} from 'vitest'
import {CreateProgrammeRawInput} from "../../../../../../../src/controllers/node-types/programmes/types/CreateProgrammeRawInput"
import {validate} from "../../../../../../../src/controllers/node-types/programmes/create"

test.each([
    [false, 2002, 2022, "BBC Two", 33, 240, 60, "GB"],
    ["Top Gear", false, 2022, "BBC Two", 33, 240, 60, "GB"],
    ["Top Gear", 2002, false, "BBC Two", 33, 240, 60, "GB"],
    ["Top Gear", 2002, 2022, false, 33, 240, 60, "GB"],
    ["Top Gear", 2002, 2022, "BBC Two", false, 240, 60, "GB"],
    ["Top Gear", 2002, 2022, "BBC Two", 33, false, 60, "GB"],
    ["Top Gear", 2002, 2022, "BBC Two", 33, 240, false, "GB"],
    ["Top Gear", 2002, 2022, "BBC Two", 33, 240, 60, false],
])('validating a request where the fields have invalid data types', async (
    name,
    aired_from_year,
    aired_until_year,
    channel,
    total_seasons,
    total_episodes,
    regular_episode_running_time,
    country_code,
) => {
    const data: CreateProgrammeRawInput = {
        name,
        aired_from_year,
        aired_until_year,
        channel,
        total_seasons,
        total_episodes,
        regular_episode_running_time,
        country_code,
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
