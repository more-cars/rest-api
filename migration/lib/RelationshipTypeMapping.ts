import {DbRelationship} from "../../src/db/types/DbRelationship"
import type {RelationshipTypeLabelOld} from "./types/RelationshipTypeLabelOld"

export const RelationshipTypeMapping = new Map<DbRelationship, RelationshipTypeLabelOld>([
    [DbRelationship.BrandHasCarModel, 'BUILDS_CAR_MODEL'],
    [DbRelationship.NodeHasImage, 'HAS_IMAGE'],
    [DbRelationship.CarModelHasPrimeImage, 'IS_MAIN_IMAGE_OF_NODE'],
])
