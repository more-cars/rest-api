import {expect, test} from 'vitest'
import {Company} from "../../../../../src/models/companies/Company"
import {seedCompany} from "../../../../_toolbox/dbSeeding/companies/nodes/seedCompany"

test('Deleting an company that does not exist should return "false"', async () => {
    const success = await Company.delete(-42)

    expect(success)
        .toEqual(false)
})

test('When the company exists it should be deleted', async () => {
    const node = await seedCompany()
    const success = await Company.delete(node.id)

    expect(success)
        .toEqual(true)
})
