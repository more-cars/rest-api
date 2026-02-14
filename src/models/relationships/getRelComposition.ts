import {RelationshipType} from "./types/RelationshipType"
import {NodeType} from "../types/NodeType"
import {ImageRelComposition} from "../images/types/ImageRelComposition"
import {CompanyRelComposition} from "../companies/types/CompanyRelComposition"
import {BrandRelComposition} from "../brands/types/BrandRelComposition"
import {CarModelRelComposition} from "../car-models/types/CarModelRelComposition"
import {CarModelVariantRelComposition} from "../car-model-variants/types/CarModelVariantRelComposition"
import {RaceTrackRelComposition} from "../race-tracks/types/RaceTrackRelComposition"
import {TrackLayoutRelComposition} from "../track-layouts/types/TrackLayoutRelComposition"
import {RacingSeriesRelComposition} from "../racing-series/types/RacingSeriesRelComposition"
import {RacingEventRelComposition} from "../racing-events/types/RacingEventRelComposition"
import {RacingSessionRelComposition} from "../racing-sessions/types/RacingSessionRelComposition"
import {SessionResultRelComposition} from "../session-results/types/SessionResultRelComposition"
import {LapTimeRelComposition} from "../lap-times/types/LapTimeRelComposition"
import {RacingGameRelComposition} from "../racing-games/types/RacingGameRelComposition"
import {GamingPlatformRelComposition} from "../gaming-platforms/types/GamingPlatformRelComposition"

export function getRelComposition(relationshipType: RelationshipType) {
    const mapping = new Map<RelationshipType, {
        startNodeType: NodeType,
        endNodeType: NodeType,
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
    ))

    const relationshipNodePartnerTypes = mapping.get(relationshipType)

    if (!relationshipNodePartnerTypes) {
        throw new Error(`No mapping for relationship type ${relationshipType} not found`)
    }

    return relationshipNodePartnerTypes
}
