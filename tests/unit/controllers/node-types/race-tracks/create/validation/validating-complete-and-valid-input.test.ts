import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a complete and valid request', async () => {
    const data = {
        name: "Lausitzring",
        opened: 2000,
        closed: null,
        type: "permanent race track",
        location: "Klettwitz",
        geo_position: "51°32′0″N 13°55′10″E",
        country_code: "DE",
    }

    const result = validateInputData(data, NodeType.RaceTrack)

    expect(result)
        .toBeTruthy()
})
