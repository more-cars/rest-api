import {describe, expect, test} from 'vitest'
import type {MagazineIssueInput} from "../../../../../../src/models/node-types/magazine-issues/types/MagazineIssueInput"
import {unmarshalInputData} from "../../../../../../src/controllers/nodes/unmarshalInputData"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: MagazineIssueInput = {
            title: "   Performance Car of the Year  ",
            consecutive_number: 402,
            issue_number: 12,
            issue_year: 2025,
            release_date: "   2025-11-26  ",
            single_copy_price: 5.99,
            single_copy_price_unit: "   GBP  ",
            pages: 156,
        }

        const result = unmarshalInputData(data, [
            'title',
            'consecutive_number',
            'issue_number',
            'issue_year',
            'release_date',
            'single_copy_price',
            'single_copy_price_unit',
            'pages',
        ])

        expect(result)
            .toStrictEqual({
                title: "Performance Car of the Year",
                consecutive_number: 402,
                issue_number: 12,
                issue_year: 2025,
                release_date: "2025-11-26",
                single_copy_price: 5.99,
                single_copy_price_unit: "GBP",
                pages: 156,
            })
    })
})
