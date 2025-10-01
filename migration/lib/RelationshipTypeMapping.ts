import {DbRelationship} from "../../src/db/types/DbRelationship"
import type {RelationshipTypeLabelOld} from "./types/RelationshipTypeLabelOld"

// mapping of all relationship types to find out their names in the old database
export const RelationshipTypeMapping = new Map<DbRelationship, RelationshipTypeLabelOld>([
    [DbRelationship.CompanyHasBrand, 'OWNS_BRAND'],
    [DbRelationship.BrandHasCarModel, 'BUILDS_CAR_MODEL'],
    [DbRelationship.NodeHasImage, 'HAS_IMAGE'],
    [DbRelationship.CarModelHasPrimeImage, 'IS_MAIN_IMAGE_OF_NODE'],
])
