import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a request where mandatory fields are missing', async () => {
    const data = {
        position: undefined,
        race_number: "44",
        driver_name: undefined,
        team_name: "Mercedes",
        race_time: "PT1H23M45.678S",
        laps: 51,
        status: "finished",
        points: 25,
    }

    const result = validateInputData(data, NodeType.SessionResult)

    expect(result)
        .toBeFalsy()
})
