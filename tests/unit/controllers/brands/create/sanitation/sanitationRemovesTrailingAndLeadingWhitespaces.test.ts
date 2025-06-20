import {sanitize} from "../../../../../../src/controllers/brands/create"
import {CreateBrandRawInput} from "../../../../../../src/controllers/brands/types/CreateBrandRawInput"

test.skip('leading and trailing whitespaces are removed', async () => {
    const data: CreateBrandRawInput = {
        name: "     BMW     ",
        full_name: "Bayerische Motoren Werke     ",
        founded: 1916,
        defunct: null,
        wmi: "WBA",
        hsn: "    0005",
    }

    const result = sanitize(data)

    expect(result)
        .toStrictEqual({
            name: "BMW",
            full_name: "Bayerische Motoren Werke",
            founded: 1916,
            defunct: null,
            wmi: "WBA",
            hsn: "0005",
        })
})
