/**
 * List of all relationships that are allowed to be created in the database.
 *
 * ⚠️ On application level there exist more relationships, because - for convenience - they cover both directions.
 *    E.g. "Car Model belongs to Brand" and "Brand has Car Model". One is an alias for the other.
 *    In the database there exist no aliases, so only one of them can be the "official" relationship.
 */
export enum DbRelationship {
    NodeHasImage = 'HAS_IMAGE',
    NodeHasPrimeImage = 'HAS_PRIME_IMAGE',
    ImageBelongsToNode = 'HAS_IMAGE',
    ImageBelongsToCompany = 'HAS_IMAGE',
    CompanyHasBrand = 'HAS_BRAND',
    CompanyHasImage = 'HAS_IMAGE',
    CompanyHasPrimeImage = 'HAS_PRIME_IMAGE',
    BrandBelongsToCompany = 'HAS_BRAND',
    BrandHasCarModel = 'HAS_CAR_MODEL',
    BrandHasImage = 'HAS_IMAGE',
    BrandHasPrimeImage = 'HAS_PRIME_IMAGE',
    CarModelBelongsToBrand = 'HAS_CAR_MODEL',
    CarModelHasSuccessor = 'HAS_SUCCESSOR',
    CarModelIsSuccessorOf = 'HAS_SUCCESSOR',
    CarModelHasImage = 'HAS_IMAGE',
    CarModelHasPrimeImage = 'HAS_PRIME_IMAGE',
    RaceTrackHasLayout = 'HAS_LAYOUT',
    RaceTrackHasImage = 'HAS_IMAGE',
    RaceTrackHasPrimeImage = 'HAS_PRIME_IMAGE',
    TrackLayoutBelongsToRaceTrack = 'HAS_LAYOUT',
    TrackLayoutHasImage = 'HAS_IMAGE',
    TrackLayoutHasPrimeImage = 'HAS_PRIME_IMAGE',
    RacingSeriesHasRacingEvent = 'HAS_RACING_EVENT',
    RacingSeriesHasImage = 'HAS_IMAGE',
    RacingSeriesHasPrimeImage = 'HAS_PRIME_IMAGE',
    RacingEventBelongsToRacingSeries = 'HAS_RACING_EVENT',
    RacingEventIsFollowedByEvent = 'IS_FOLLOWED_BY_EVENT',
    RacingEventFollowsEvent = 'IS_FOLLOWED_BY_EVENT',
    RacingEventTookPlaceAtRaceTrack = 'TOOK_PLACE_AT_RACE_TRACK',
    RacingEventUsedTheTrackLayout = 'USED_THE_TRACK_LAYOUT',
    RacingEventHasImage = 'HAS_IMAGE',
    RacingEventHasPrimeImage = 'HAS_PRIME_IMAGE',
    RaceTrackHostedRacingEvent = 'TOOK_PLACE_AT_RACE_TRACK',
}
