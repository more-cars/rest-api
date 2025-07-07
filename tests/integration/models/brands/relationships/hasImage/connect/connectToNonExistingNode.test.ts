import {seedBrand} from "../../../../../../dbSeeding/brands/nodes/seedBrand"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {seedImage} from "../../../../../../dbSeeding/images/nodes/seedImage.ts"

test('Expecting an error when any of the nodes does not exist',
    async () => {
        const brand = await seedBrand()
        const image = await seedImage()

        const relationshipAttemptWithNonExistentCarModel =
            await Brand.createHasImageRelationship(-42, image.id)
        expect(relationshipAttemptWithNonExistentCarModel)
            .toBeFalsy()

        const relationshipAttemptWithNonExistentBrand =
            await Brand.createHasImageRelationship(brand.id, -43)
        expect(relationshipAttemptWithNonExistentBrand)
            .toBeFalsy()

        const relationshipAttemptWithBothNodesNonExistent =
            await Brand.createHasImageRelationship(-44, -45)
        expect(relationshipAttemptWithBothNodesNonExistent)
            .toBeFalsy()
    })
