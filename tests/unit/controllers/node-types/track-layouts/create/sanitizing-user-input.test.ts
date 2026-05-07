import {describe, expect, test} from 'vitest'
import {CreateTrackLayoutInput} from "../../../../../../src/models/node-types/track-layouts/types/CreateTrackLayoutInput"
import {unmarshalInputData} from "../../../../../../src/controllers/nodes/unmarshalInputData"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: CreateTrackLayoutInput = {
            name: "   GP Circuit  ",
            year_from: 1967,
            year_to: 1999,
            length: 7.004,
            length_unit: "   km  ",
            direction: "   clockwise  ",
            elevation_change: 71,
            elevation_change_unit: "   m  ",
            surface: "   asphalt  ",
        }

        const result = unmarshalInputData(data, [
            'name',
            'year_from',
            'year_to',
            'length',
            'length_unit',
            'direction',
            'elevation_change',
            'elevation_change_unit',
            'surface',
        ])

        expect(result)
            .toStrictEqual({
                name: "GP Circuit",
                year_from: 1967,
                year_to: 1999,
                length: 7.004,
                length_unit: "km",
                direction: "clockwise",
                elevation_change: 71,
                elevation_change_unit: "m",
                surface: "asphalt",
            })
    })
})
