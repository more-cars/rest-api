import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/companies/marshalling/unmarshalInputData"

test('unmarshalling a complete and valid request', async () => {
    const data: any = {
        name: "BMW AG",
        founded: 1916,
        defunct: null,
        headquarters_location: "Munich",
        legal_headquarters_location: "Munich",
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: "BMW AG",
            founded: 1916,
            defunct: null,
            headquarters_location: "Munich",
            legal_headquarters_location: "Munich",
        })
})
