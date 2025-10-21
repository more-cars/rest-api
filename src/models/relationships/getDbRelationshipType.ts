import {RelationshipType} from "./types/RelationshipType"
import {DbRelationship} from "../../db/types/DbRelationship"
import {RelationshipTypeNotFoundError} from "../types/RelationshipTypeNotFoundError"

export function getDbRelationshipType(relationshipType: RelationshipType): DbRelationship {
    const mapping = new Map<RelationshipType, DbRelationship>([
        [RelationshipType.CompanyHasBrand, DbRelationship.CompanyHasBrand],
        [RelationshipType.CompanyHasImage, DbRelationship.CompanyHasImage],
        [RelationshipType.CompanyHasPrimeImage, DbRelationship.CompanyHasPrimeImage],
        [RelationshipType.BrandBelongsToCompany, DbRelationship.BrandBelongsToCompany],
        [RelationshipType.BrandHasCarModel, DbRelationship.BrandHasCarModel],
        [RelationshipType.BrandHasImage, DbRelationship.BrandHasImage],
        [RelationshipType.BrandHasPrimeImage, DbRelationship.BrandHasPrimeImage],
        [RelationshipType.CarModelBelongsToBrand, DbRelationship.CarModelBelongsToBrand],
        [RelationshipType.CarModelHasSuccessor, DbRelationship.CarModelHasSuccessor],
        [RelationshipType.CarModelIsSuccessorOf, DbRelationship.CarModelIsSuccessorOf],
        [RelationshipType.CarModelHasImage, DbRelationship.CarModelHasImage],
        [RelationshipType.CarModelHasPrimeImage, DbRelationship.CarModelHasPrimeImage],
        [RelationshipType.RaceTrackHasLayout, DbRelationship.RaceTrackHasLayout],
        [RelationshipType.ImageBelongsToNode, DbRelationship.ImageBelongsToNode],
    ])

    const mappedRel = mapping.get(relationshipType)

    if (!mappedRel) {
        throw new RelationshipTypeNotFoundError(relationshipType)
    }

    return mappedRel
}
