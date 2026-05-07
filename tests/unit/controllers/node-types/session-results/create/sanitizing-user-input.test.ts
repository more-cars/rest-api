import {describe, expect, test} from 'vitest'
import {CreateSessionResultInput} from "../../../../../../src/models/node-types/session-results/types/CreateSessionResultInput"
import {unmarshalInputData} from "../../../../../../src/controllers/nodes/unmarshalInputData"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: CreateSessionResultInput = {
            position: 1,
            race_number: "   44  ",
            driver_name: "   Lewis Hamilton  ",
            team_name: "   Mercedes  ",
            race_time: "   PT1H23M45.678S  ",
            laps: 51,
            status: "   finished  ",
            points: 25,
        }

        const result = unmarshalInputData(data, [
            'position',
            'race_number',
            'driver_name',
            'team_name',
            'race_time',
            'laps',
            'status',
            'points',
        ])

        expect(result)
            .toStrictEqual({
                position: 1,
                race_number: "44",
                driver_name: "Lewis Hamilton",
                team_name: "Mercedes",
                race_time: "PT1H23M45.678S",
                laps: 51,
                status: "finished",
                points: 25,
            })
    })
})
