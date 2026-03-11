import {expect, test} from 'vitest'
import {CreateMotorShowRawInput} from "../../../../../../../src/controllers/node-types/motor-shows/types/CreateMotorShowRawInput"
import {validate} from "../../../../../../../src/controllers/node-types/motor-shows/create"

test.each([
    [false, "2017-09-14", "2017-09-24", "Frankfurt", "international", "new cars"],
    ["2017 IAA Frankfurt", false, "2017-09-24", "Frankfurt", "international", "new cars"],
    ["2017 IAA Frankfurt", "2017-09-14", false, "Frankfurt", "international", "new cars"],
    ["2017 IAA Frankfurt", "2017-09-14", "2017-09-24", false, "international", "new cars"],
    ["2017 IAA Frankfurt", "2017-09-14", "2017-09-24", "Frankfurt", false, "new cars"],
    ["2017 IAA Frankfurt", "2017-09-14", "2017-09-24", "Frankfurt", "international", false],
])('validating a request where the fields have invalid data types', async (
    name,
    date_from,
    date_until,
    location,
    target_audience,
    focus,
) => {
    const data: CreateMotorShowRawInput = {
        name,
        date_from,
        date_until,
        location,
        target_audience,
        focus,
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
