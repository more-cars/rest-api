import {describe, expect, test} from 'vitest'
import {CreateMagazineIssueInput} from "../../../../../src/models/node-types/magazine-issues/types/CreateMagazineIssueInput"
import {sanitize} from "../../../../../src/controllers/node-types/magazine-issues/create"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: CreateMagazineIssueInput = {
            title: "   Performance Car of the Year  ",
            consecutive_number: 402,
            issue_number: 12,
            issue_year: 2025,
            release_date: "   2025-11-26  ",
            single_copy_price: 5.99,
            single_copy_price_unit: "   GBP  ",
            pages: 156,
        }

        const result = sanitize(data)

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
