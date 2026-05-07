import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a valid request where optional fields are missing', async () => {
    const data = {
        position: 1,
        race_number: undefined,
        driver_name: "Lewis Hamilton",
        team_name: undefined,
        race_time: undefined,
        laps: undefined,
        status: undefined,
        points: undefined,
    }

    const result = validateInputData(data, NodeType.SessionResult)

    expect(result)
        .toBeTruthy()
})
