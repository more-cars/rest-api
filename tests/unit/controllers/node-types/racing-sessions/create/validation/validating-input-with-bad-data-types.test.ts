import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test.each([
    [true, "2025-05-20", "14:00", "PT120M", 58, "laps"],
    ["Grand Prix", false, "14:00", "PT120M", 58, "laps"],
    ["Grand Prix", "2025-05-20", false, "PT120M", 58, "laps"],
    ["Grand Prix", "2025-05-20", "14:00", false, 58, "laps"],
    ["Grand Prix", "2025-05-20", "14:00", "PT120M", false, "laps"],
    ["Grand Prix", "2025-05-20", "14:00", "PT120M", 58, false],
])('validating a request where the fields have invalid data types', async (
    name, start_date, start_time, duration, distance, distance_unit
) => {
    const data = {
        name,
        start_date,
        start_time,
        duration,
        distance,
        distance_unit,
    }

    const result = validateInputData(data, NodeType.RacingSession)

    expect(result)
        .toBeFalsy()
})
