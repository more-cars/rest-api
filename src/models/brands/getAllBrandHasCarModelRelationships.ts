import {BrandNode} from "../../types/brands/BrandNode"
import {DbRelationship} from "../../types/DbRelationship"
import {BrandRelationship} from "../../types/brands/BrandRelationship"
import {BrandHasCarModelRelationship} from "../../types/brands/BrandHasCarModelRelationship"
import {findRelationships} from "../../db/findRelationships"

export async function getAllBrandHasCarModelRelationships(brand: BrandNode) {
    const relationships = await findRelationships(
        brand.id as number,
        DbRelationship.BrandHasCarModel,
    )
    const mappedRelationships: BrandHasCarModelRelationship[] = []

    relationships.forEach(relationship => {
        mappedRelationships.push(<BrandHasCarModelRelationship>{
            brand_id: relationship.start_node_id,
            car_model_id: relationship.end_node_id,
            relationship_id: relationship.relationship_id,
            relationship_name: BrandRelationship.hasCarModel,
        })
    })

    return mappedRelationships
}
