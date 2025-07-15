import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"

test('Expecting an error when any of the nodes does not exist',
    async () => {
        const brand = await seedBrand()
        const image = await seedImage()

        const relationshipAttemptWithNonExistentBrand =
            await Brand.createHasImageRelationship(-42, image.id)
        expect(relationshipAttemptWithNonExistentBrand)
            .toBeFalsy()

        const relationshipAttemptWithNonExistentImage =
            await Brand.createHasImageRelationship(brand.id, -43)
        expect(relationshipAttemptWithNonExistentImage)
            .toBeFalsy()

        const relationshipAttemptWithBothNodesNonExistent =
            await Brand.createHasImageRelationship(-44, -45)
        expect(relationshipAttemptWithBothNodesNonExistent)
            .toBeFalsy()
    })
