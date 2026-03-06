import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/ratings/marshalling/unmarshalInputData"

test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: any = {

    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            rating_value: undefined,
            scale_minimum: undefined,
            scale_maximum: undefined,
            scale_direction: undefined
        })
})
