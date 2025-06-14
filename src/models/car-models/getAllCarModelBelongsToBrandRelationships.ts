import {DbRelationship} from "../../types/DbRelationship"
import {BrandRelationship} from "../../types/brands/BrandRelationship"
import {findRelationships} from "../../db/findRelationships"
import {CarModelNode} from "../../types/car-models/CarModelNode"
import {CarModelBelongsToBrandRelationship} from "../../types/car-models/CarModelBelongsToBrandRelationship"

export async function getAllCarModelBelongsToBrandRelationships(carModel: CarModelNode) {
    const relationships = await findRelationships(
        carModel.id as number,
        DbRelationship.BrandHasCarModel,
    )
    const mappedRelationships: CarModelBelongsToBrandRelationship[] = []

    relationships.forEach(relationship => {
        mappedRelationships.push(<CarModelBelongsToBrandRelationship>{
            car_model_id: relationship.end_node_id,
            brand_id: relationship.start_node_id,
            relationship_id: relationship.relationship_id,
            relationship_name: BrandRelationship.hasCarModel,
        })
    })

    return mappedRelationships
}
