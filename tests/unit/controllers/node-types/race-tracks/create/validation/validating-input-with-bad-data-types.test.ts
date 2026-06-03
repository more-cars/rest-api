import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test.each([
    [true, 2000, 2345, "permanent-race-track", "Klettwitz", "51°32′0″N 13°55′10″E", "DE"],
    ["Lausitzring", false, 2345, "permanent-race-track", "Klettwitz", "51°32′0″N 13°55′10″E", "DE"],
    ["Lausitzring", 2000, false, "permanent-race-track", "Klettwitz", "51°32′0″N 13°55′10″E", "DE"],
    ["Lausitzring", 2000, 2345, false, "Klettwitz", "51°32′0″N 13°55′10″E", "DE"],
    ["Lausitzring", 2000, 2345, "permanent-race-track", false, "51°32′0″N 13°55′10″E", "DE"],
    ["Lausitzring", 2000, 2345, "permanent-race-track", "Klettwitz", false, "DE"],
    ["Lausitzring", 2000, 2345, "permanent-race-track", "Klettwitz", "51°32′0″N 13°55′10″E", false],

])('validating a request where the fields have invalid data types', async (
    name, opened, closed, type, location, geo_position, country_code
) => {
    const data = {
        name,
        opened,
        closed,
        type,
        location,
        geo_position,
        country_code,
    }

    const result = validateInputData(data, NodeType.RaceTrack)

    expect(result)
        .toBeFalsy()
})
