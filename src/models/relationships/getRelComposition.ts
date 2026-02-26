import type {RelType} from "./types/RelType"
import type {ModelNodeType} from "../types/ModelNodeType"
import {ImageRelComposition} from "../node-types/images/types/ImageRelComposition"
import {CompanyRelComposition} from "../node-types/companies/types/CompanyRelComposition"
import {BrandRelComposition} from "../node-types/brands/types/BrandRelComposition"
import {CarModelRelComposition} from "../node-types/car-models/types/CarModelRelComposition"
import {CarModelVariantRelComposition} from "../node-types/car-model-variants/types/CarModelVariantRelComposition"
import {RaceTrackRelComposition} from "../node-types/race-tracks/types/RaceTrackRelComposition"
import {TrackLayoutRelComposition} from "../node-types/track-layouts/types/TrackLayoutRelComposition"
import {RacingSeriesRelComposition} from "../node-types/racing-series/types/RacingSeriesRelComposition"
import {RacingEventRelComposition} from "../node-types/racing-events/types/RacingEventRelComposition"
import {RacingSessionRelComposition} from "../node-types/racing-sessions/types/RacingSessionRelComposition"
import {SessionResultRelComposition} from "../node-types/session-results/types/SessionResultRelComposition"
import {LapTimeRelComposition} from "../node-types/lap-times/types/LapTimeRelComposition"
import {RacingGameRelComposition} from "../node-types/racing-games/types/RacingGameRelComposition"
import {GamingPlatformRelComposition} from "../node-types/gaming-platforms/types/GamingPlatformRelComposition"
import {MagazineRelComposition} from "../node-types/magazines/types/MagazineRelComposition"

export function getRelComposition(relationshipType: RelType) {
    const mapping = new Map<RelType, {
        startNodeType: ModelNodeType,
        endNodeType: ModelNodeType,
        isReverseRelationship: boolean,
    }>(ImageRelComposition.concat(
        CompanyRelComposition,
        BrandRelComposition,
        CarModelRelComposition,
        CarModelVariantRelComposition,
        RaceTrackRelComposition,
        TrackLayoutRelComposition,
        RacingSeriesRelComposition,
        RacingEventRelComposition,
        RacingSessionRelComposition,
        SessionResultRelComposition,
        LapTimeRelComposition,
        RacingGameRelComposition,
        GamingPlatformRelComposition,
        MagazineRelComposition,
    ))

    const relationshipNodePartnerTypes = mapping.get(relationshipType)

    if (!relationshipNodePartnerTypes) {
        throw new Error(`No mapping for relationship type ${relationshipType} not found`)
    }

    return relationshipNodePartnerTypes
}
