import {BaseRelationship} from "../../../../src/types/BaseRelationship"
import {seedBrand} from "../nodes/seedBrand"
import {seedCarModel} from "../../car-models/nodes/seedCarModel"
import {createRelationship} from "../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../src/types/DbRelationship"

export async function seedRelationship(): Promise<BaseRelationship> {
    const brandNode = await seedBrand()
    const carModelNode = await seedCarModel()
    const relationship = await createRelationship(brandNode.id, carModelNode.id, DbRelationship.BrandHasCarModel)

    if (!relationship) {
        throw new Error("Failed to create relationship between brand and car model")
    }

    return relationship
}
