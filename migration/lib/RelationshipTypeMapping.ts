import {DbRelationship} from "../../src/db/types/DbRelationship"
import {RelationshipTypeLabelOld} from "./types/RelationshipTypeLabelOld"

// mapping of all relationship types to find out their names in the old database
export const RelationshipTypeMapping = new Map<DbRelationship, RelationshipTypeLabelOld>([
    [DbRelationship.CompanyHasBrand, RelationshipTypeLabelOld.CompanyHasBrand],
    [DbRelationship.BrandHasCarModel, RelationshipTypeLabelOld.BrandHasCarModel],
    [DbRelationship.CarModelHasSuccessor, RelationshipTypeLabelOld.CarModelHasSuccessor],
    [DbRelationship.NodeHasImage, RelationshipTypeLabelOld.NodeHasImage],
    [DbRelationship.NodeHasPrimeImage, RelationshipTypeLabelOld.NodeHasPrimeImage],
])
