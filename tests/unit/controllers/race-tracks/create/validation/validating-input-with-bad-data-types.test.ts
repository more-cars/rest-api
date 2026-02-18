import {expect, test} from 'vitest'
import {CreateRaceTrackRawInput} from "../../../../../../src/controllers/node-types/race-tracks/types/CreateRaceTrackRawInput"
import {validate} from "../../../../../../src/controllers/node-types/race-tracks/create"

test.each([
    [true, 2000, 2345, "permanent race track", "Klettwitz", "51°32'0\"N 13°55'10\"E"],
    ["Lausitzring", false, 2345, "permanent race track", "Klettwitz", "51°32'0\"N 13°55'10\"E"],
    ["Lausitzring", 2000, false, "permanent race track", "Klettwitz", "51°32'0\"N 13°55'10\"E"],
    ["Lausitzring", 2000, 2345, false, "Klettwitz", "51°32'0\"N 13°55'10\"E"],
    ["Lausitzring", 2000, 2345, "permanent race track", false, "51°32'0\"N 13°55'10\"E"],
    ["Lausitzring", 2000, 2345, "permanent race track", "Klettwitz", false],

])('validating a request where the fields have invalid data types', async (
    name, opened, closed, type, location, geo_position
) => {
    const data: CreateRaceTrackRawInput = {
        name,
        opened,
        closed,
        type,
        location,
        geo_position,
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
