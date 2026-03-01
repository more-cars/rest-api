import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/gaming-platforms/marshalling/unmarshalInputData"


test('unmarshalling a request where the data types are incorrect', async () => {
    const data: any = {
        name: true,
        release_year: true,
        manufacturer: true,
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: true,
            release_year: true,
            manufacturer: true,
        })
})
