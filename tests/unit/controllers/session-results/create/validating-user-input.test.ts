import {describe, expect, test} from 'vitest'
import {
    CreateSessionResultRawInput
} from "../../../../../src/controllers/session-results/types/CreateSessionResultRawInput"
import {validate} from "../../../../../src/controllers/session-results/create"

describe('Validating user input', () => {
    test('mandatory fields are missing', async () => {
        const data: CreateSessionResultRawInput = {
            position: undefined,
            race_number: "44",
            driver_name: undefined,
            team_name: "Mercedes",
            race_time: "PT1H23M45.678S",
            laps: 51,
            status: "finished",
            points: 25,
        }

        const result = validate(data)

        expect(result)
            .toBeFalsy()
    })

    test('optional fields are missing', async () => {
        const data: CreateSessionResultRawInput = {
            position: 1,
            race_number: undefined,
            driver_name: "Lewis Hamilton",
            team_name: undefined,
            race_time: undefined,
            laps: undefined,
            status: undefined,
            points: undefined,
        }

        const result = validate(data)

        expect(result)
            .toBeTruthy()
    })

    test('providing valid input', async () => {
        const data: CreateSessionResultRawInput = {
            position: 1,
            race_number: "44",
            driver_name: "Lewis Hamilton",
            team_name: "Mercedes",
            race_time: "PT1H23M45.678S",
            laps: 51,
            status: "finished",
            points: 25,
        }

        const result = validate(data)

        expect(result)
            .toBeTruthy()
    })
})
