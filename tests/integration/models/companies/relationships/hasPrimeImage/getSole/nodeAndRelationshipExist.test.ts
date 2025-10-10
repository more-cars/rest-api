import {expect, test} from 'vitest'
import {Company} from "../../../../../../../src/models/companies/Company"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../_toolbox/schemas/RelationshipSchema"

test('Company and relationship exist', async () => {
    const expectedRelationship = await seedRelationship('company', 'image', DbRelationship.CompanyHasPrimeImage)
    const actualRelationship = await Company.getHasPrimeImageRelationship(expectedRelationship.start_node_id)

    validateJson(actualRelationship, RelationshipSchema)

    expect(actualRelationship.company_id)
        .toBe(expectedRelationship.start_node_id)

    expect(actualRelationship.image_id)
        .toBe(expectedRelationship.end_node_id)
})
