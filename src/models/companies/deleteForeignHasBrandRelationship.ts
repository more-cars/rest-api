import {getRelationshipForSpecificNode} from "../../db/relationships/getRelationshipForSpecificNode"
import {DbRelationship} from "../../db/types/DbRelationship"
import {deleteRelationshipById} from "../../db/relationships/deleteRelationshipById"

export async function deleteForeignHasBrandRelationship(brandId: number) {
    const relationship = await getRelationshipForSpecificNode(
        brandId,
        DbRelationship.CompanyHasBrand,
    )

    if (relationship) {
        await deleteRelationshipById(relationship.relationship_id)
    }
}
