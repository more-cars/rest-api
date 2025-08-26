/**
 * List of all relationships that are allowed to be created in the database.
 *
 * ⚠️ On application level there exist more relationships, because - for convenience - they cover both directions.
 *    E.g. "Car Model belongs to Brand" and "Brand has Car Model". One is an alias for the other.
 *    In the database there exist no aliases, so only one of them can be the "official" relationship.
 */
export enum DbRelationship {
    BrandHasCarModel = 'HAS_CAR_MODEL',
    NodeHasImage = 'HAS_IMAGE',
    CarModelHasPrimeImage = 'HAS_PRIME_IMAGE',
}
