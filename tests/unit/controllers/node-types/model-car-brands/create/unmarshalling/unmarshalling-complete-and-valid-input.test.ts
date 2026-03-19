import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/model-car-brands/marshalling/unmarshalInputData"

test('unmarshalling a complete and valid request', async () => {
    const data: any = {
        name: "Hot Wheels",
        founded: 1968,
        defunct: null,
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: "Hot Wheels",
            founded: 1968,
            defunct: null,
        })
})
