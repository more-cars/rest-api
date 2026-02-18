import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/gaming-platforms/marshalling/unmarshalInputData"

test('unmarshalling a complete and valid request', async () => {
    const data: any = {
        name: "PlayStation 5",
        release_year: 2020,
        manufacturer: "Sony",
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: "PlayStation 5",
            release_year: 2020,
            manufacturer: "Sony",
        })
})
