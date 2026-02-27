import {RelationshipType} from "../db/types/RelationshipType"
import {DbNodeType} from "../db/types/DbNodeType"
import {ImageRelationshipSpecification} from "./node-types/ImageRelationshipSpecification"
import {CompanyRelationshipSpecification} from "./node-types/CompanyRelationshipSpecification"
import {BrandRelationshipSpecification} from "./node-types/BrandRelationshipSpecification"
import {CarModelRelationshipSpecification} from "./node-types/CarModelRelationshipSpecification"
import {CarModelVariantRelationshipSpecification} from "./node-types/CarModelVariantRelationshipSpecification"
import {RaceTrackRelationshipSpecification} from "./node-types/RaceTrackRelationshipSpecification"
import {TrackLayoutRelationshipSpecification} from "./node-types/TrackLayoutRelationshipSpecification"
import {RacingSeriesRelationshipSpecification} from "./node-types/RacingSeriesRelationshipSpecification"
import {RacingEventRelationshipSpecification} from "./node-types/RacingEventRelationshipSpecification"
import {RacingSessionRelationshipSpecification} from "./node-types/RacingSessionRelationshipSpecification"
import {SessionResultRelationshipSpecification} from "./node-types/SessionResultRelationshipSpecification"
import {LapTimeRelationshipSpecification} from "./node-types/LapTimeRelationshipSpecification"
import {RacingGameRelationshipSpecification} from "./node-types/RacingGameRelationshipSpecification"
import {GamingPlatformRelationshipSpecification} from "./node-types/GamingPlatformRelationshipSpecification"
import {MagazineRelationshipSpecification} from "./node-types/MagazineRelationshipSpecification"

export function getRelationshipTypeSpecification(relationshipType: RelationshipType) {
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
