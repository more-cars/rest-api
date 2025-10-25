export enum RelationshipTypeLabelOld {
    CompanyHasBrand = "OWNS_BRAND",
    BrandHasCarModel = "BUILDS_CAR_MODEL",
    CarModelHasSuccessor = "IS_SUCCESSOR_OF",
    RaceTrackHasLayout = "HAS_RACE_TRACK_VARIANT",
    RacingSeriesHasRacingEvent = "HAS_RACING_EVENT",
    RacingEventIsFollowedByEvent = "IS_SUCCESSOR_OF",
    RacingEventTookPlaceAtRaceTrack = "TAKES_PLACE_AT_RACE_TRACK",
    RacingEventUsedTheTrackLayout = "TAKES_PLACE_AT_RACE_TRACK_VARIANT",
    NodeHasImage = "HAS_IMAGE",
    NodeHasPrimeImage = "IS_MAIN_IMAGE_OF_NODE",
}