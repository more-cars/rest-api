import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/brands/marshalling/unmarshalInputData"

test('unmarshalling a complete and valid request', async () => {
    const data: any = {
        name: "BMW",
        full_name: "Bayerische Motoren Werke",
        founded: 1916,
        defunct: 2222,
        wmi: "WBA",
        hsn: "0005",
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: "BMW",
            full_name: "Bayerische Motoren Werke",
            founded: 1916,
            defunct: 2222,
            wmi: "WBA",
            hsn: "0005",
        })
})
