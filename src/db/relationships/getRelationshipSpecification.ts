import {RelationshipType} from "../types/RelationshipType"
import {DbNodeType} from "../types/DbNodeType"
import {ImageRelationshipSpecification} from "../node-types/images/types/ImageRelationshipSpecification"
import {CompanyRelationshipSpecification} from "../node-types/companies/types/CompanyRelationshipSpecification"
import {BrandRelationshipSpecification} from "../node-types/brands/types/BrandRelationshipSpecification"
import {CarModelRelationshipSpecification} from "../node-types/car-models/types/CarModelRelationshipSpecification"
import {CarModelVariantRelationshipSpecification} from "../node-types/car-model-variants/types/CarModelVariantRelationshipSpecification"
import {RaceTrackRelationshipSpecification} from "../node-types/race-tracks/types/RaceTrackRelationshipSpecification"
import {TrackLayoutRelationshipSpecification} from "../node-types/track-layouts/types/TrackLayoutRelationshipSpecification"
import {RacingSeriesRelationshipSpecification} from "../node-types/racing-series/types/RacingSeriesRelationshipSpecification"
import {RacingEventRelationshipSpecification} from "../node-types/racing-events/types/RacingEventRelationshipSpecification"
import {RacingSessionRelationshipSpecification} from "../node-types/racing-sessions/types/RacingSessionRelationshipSpecification"
import {SessionResultRelationshipSpecification} from "../node-types/session-results/types/SessionResultRelationshipSpecification"
import {LapTimeRelationshipSpecification} from "../node-types/lap-times/types/LapTimeRelationshipSpecification"
import {RacingGameRelationshipSpecification} from "../node-types/racing-games/types/RacingGameRelationshipSpecification"
import {GamingPlatformRelationshipSpecification} from "../node-types/gaming-platforms/types/GamingPlatformRelationshipSpecification"
import {MagazineRelationshipSpecification} from "../node-types/magazines/types/MagazineRelationshipSpecification"

export function getRelationshipSpecification(relationshipType: RelationshipType) {
    const mapping = new Map<RelationshipType, {
        startNodeType: DbNodeType,
        endNodeType: DbNodeType,
        isReverseRelationship: boolean,
    }>(CompanyRelationshipSpecification.concat(
        BrandRelationshipSpecification,
        CarModelRelationshipSpecification,
        CarModelVariantRelationshipSpecification,
        RaceTrackRelationshipSpecification,
        TrackLayoutRelationshipSpecification,
        RacingSeriesRelationshipSpecification,
        RacingEventRelationshipSpecification,
        RacingSessionRelationshipSpecification,
        SessionResultRelationshipSpecification,
        LapTimeRelationshipSpecification,
        RacingGameRelationshipSpecification,
        GamingPlatformRelationshipSpecification,
        MagazineRelationshipSpecification,
        ImageRelationshipSpecification,
    ))

    const spec = mapping.get(relationshipType)

    if (!spec) {
        throw new Error(`No mapping for relationship type ${relationshipType} found`)
    }

    return spec
}
