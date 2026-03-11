import {describe, expect, test} from 'vitest'
import {CreateMotorShowInput} from "../../../../../../src/models/node-types/motor-shows/types/CreateMotorShowInput"
import {sanitize} from "../../../../../../src/controllers/node-types/motor-shows/create"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: CreateMotorShowInput = {
            name: "   2017 IAA Frankfurt  ",
            date_from: "   2017-09-14  ",
            date_until: "   2017-09-24  ",
            location: "   Frankfurt  ",
            target_audience: "   international  ",
            focus: "   new cars  ",
        }

        const result = sanitize(data)

        expect(result)
            .toStrictEqual({
                name: "2017 IAA Frankfurt",
                date_from: "2017-09-14",
                date_until: "2017-09-24",
                location: "Frankfurt",
                target_audience: "international",
                focus: "new cars",
            })
    })
})
