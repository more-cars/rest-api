import {DbRelationship} from "../types/DbRelationship"
import {DbRelationshipName} from "../types/DbRelationshipName"
import {NodeTypeLabel} from "../NodeTypeLabel"
import {ImageRelationshipSpecification} from "../nodes/images/types/ImageRelationshipSpecification"
import {CompanyRelationshipSpecification} from "../nodes/companies/types/CompanyRelationshipSpecification"
import {BrandRelationshipSpecification} from "../nodes/brands/types/BrandRelationshipSpecification"
import {CarModelRelationshipSpecification} from "../nodes/car-models/types/CarModelRelationshipSpecification"
import {CarModelVariantRelationshipSpecification} from "../nodes/car-model-variants/types/CarModelVariantRelationshipSpecification"
import {RaceTrackRelationshipSpecification} from "../nodes/race-tracks/types/RaceTrackRelationshipSpecification"
import {TrackLayoutRelationshipSpecification} from "../nodes/track-layouts/types/TrackLayoutRelationshipSpecification"
import {RacingSeriesRelationshipSpecification} from "../nodes/racing-series/types/RacingSeriesRelationshipSpecification"
import {RacingEventRelationshipSpecification} from "../nodes/racing-events/types/RacingEventRelationshipSpecification"
import {RacingSessionRelationshipSpecification} from "../nodes/racing-sessions/types/RacingSessionRelationshipSpecification"
import {SessionResultRelationshipSpecification} from "../nodes/session-results/types/SessionResultRelationshipSpecification"
import {LapTimeRelationshipSpecification} from "../nodes/lap-times/types/LapTimeRelationshipSpecification"
import {RacingGameRelationshipSpecification} from "../nodes/racing-games/types/RacingGameRelationshipSpecification"
import {GamingPlatformRelationshipSpecification} from "../nodes/gaming-platforms/types/GamingPlatformRelationshipSpecification"

export function getRelationshipSpecification(relationshipType: DbRelationship) {
    const mapping = new Map<DbRelationship, {
        startNodeLabel: NodeTypeLabel,
        endNodeLabel: NodeTypeLabel,
        relationshipName: DbRelationshipName,
        isReverseRelationship: boolean,
    }>(ImageRelationshipSpecification.concat(
        CompanyRelationshipSpecification,
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
    ))

    const spec = mapping.get(relationshipType)

    if (!spec) {
        throw new Error(`No mapping for relationship type ${relationshipType} found`)
    }

    return spec
}
