import {describe, expect, test} from 'vitest'
import type {MotorShowInput} from "../../../../../../src/models/node-types/motor-shows/types/MotorShowInput"
import {unmarshalInputData} from "../../../../../../src/controllers/nodes/unmarshalInputData"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: MotorShowInput = {
            name: "   2017 IAA Frankfurt  ",
            date_from: "   2017-09-14  ",
            date_until: "   2017-09-24  ",
            location: "   Frankfurt  ",
            target_audience: "   international  ",
            focus: "   new-cars  ",
            country_code: "   DE  ",
        }

        const result = unmarshalInputData(data, [
            'name',
            'date_from',
            'date_until',
            'location',
            'target_audience',
            'focus',
            'country_code',
        ])

        expect(result)
            .toStrictEqual({
                name: "2017 IAA Frankfurt",
                date_from: "2017-09-14",
                date_until: "2017-09-24",
                location: "Frankfurt",
                target_audience: "international",
                focus: "new-cars",
                country_code: "DE",
            })
    })
})
