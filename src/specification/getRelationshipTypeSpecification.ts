import type {RelationshipType} from "./RelationshipType"
import type {NodeType} from "./NodeType"
import {RelationshipTypeMappingNotFoundError} from "./RelationshipTypeMappingNotFoundError"
import {CompanyRelationshipSpecification} from "./node-types/CompanyRelationshipSpecification"
import {BrandRelationshipSpecification} from "./node-types/BrandRelationshipSpecification"
import {CarModelRelationshipSpecification} from "./node-types/CarModelRelationshipSpecification"
import {CarModelVariantRelationshipSpecification} from "./node-types/CarModelVariantRelationshipSpecification"
import {PriceRelationshipSpecification} from "./node-types/PriceRelationshipSpecification"
import {RaceTrackRelationshipSpecification} from "./node-types/RaceTrackRelationshipSpecification"
import {TrackLayoutRelationshipSpecification} from "./node-types/TrackLayoutRelationshipSpecification"
import {RacingSeriesRelationshipSpecification} from "./node-types/RacingSeriesRelationshipSpecification"
import {RacingEventRelationshipSpecification} from "./node-types/RacingEventRelationshipSpecification"
import {RacingSessionRelationshipSpecification} from "./node-types/RacingSessionRelationshipSpecification"
import {SessionResultRelationshipSpecification} from "./node-types/SessionResultRelationshipSpecification"
import {LapTimeRelationshipSpecification} from "./node-types/LapTimeRelationshipSpecification"
import {RacingGameRelationshipSpecification} from "./node-types/RacingGameRelationshipSpecification"
import {GamingPlatformRelationshipSpecification} from "./node-types/GamingPlatformRelationshipSpecification"
import {ModelCarRelationshipSpecification} from "./node-types/ModelCarRelationshipSpecification"
import {ModelCarBrandRelationshipSpecification} from "./node-types/ModelCarBrandRelationshipSpecification"
import {MagazineRelationshipSpecification} from "./node-types/MagazineRelationshipSpecification"
import {MagazineIssueRelationshipSpecification} from "./node-types/MagazineIssueRelationshipSpecification"
import {RatingRelationshipSpecification} from "./node-types/RatingRelationshipSpecification"
import {ProgrammeRelationshipSpecification} from "./node-types/ProgrammeRelationshipSpecification"
import {ProgrammeEpisodeRelationshipSpecification} from "./node-types/ProgrammeEpisodeRelationshipSpecification"
import {MotorShowRelationshipSpecification} from "./node-types/MotorShowRelationshipSpecification"
import {VideoRelationshipSpecification} from "./node-types/VideoRelationshipSpecification"
import {ImageRelationshipSpecification} from "./node-types/ImageRelationshipSpecification"

export function getRelationshipTypeSpecification(relationshipType: RelationshipType) {
    const mapping = new Map<RelationshipType, {
        startNodeType: NodeType,
        endNodeType: NodeType,
        isReverseRelationship: boolean,
    }>(VideoRelationshipSpecification.concat(
        CompanyRelationshipSpecification,
        BrandRelationshipSpecification,
        CarModelRelationshipSpecification,
        CarModelVariantRelationshipSpecification,
        PriceRelationshipSpecification,
        RaceTrackRelationshipSpecification,
        TrackLayoutRelationshipSpecification,
        RacingSeriesRelationshipSpecification,
        RacingEventRelationshipSpecification,
        RacingSessionRelationshipSpecification,
        SessionResultRelationshipSpecification,
        LapTimeRelationshipSpecification,
        RacingGameRelationshipSpecification,
        GamingPlatformRelationshipSpecification,
        ModelCarRelationshipSpecification,
        ModelCarBrandRelationshipSpecification,
        MagazineRelationshipSpecification,
        MagazineIssueRelationshipSpecification,
        RatingRelationshipSpecification,
        ProgrammeRelationshipSpecification,
        ProgrammeEpisodeRelationshipSpecification,
        MotorShowRelationshipSpecification,
        ImageRelationshipSpecification,
    ))

    const relationshipSpecification = mapping.get(relationshipType)

    if (!relationshipSpecification) {
        throw new RelationshipTypeMappingNotFoundError(relationshipType)
    }

    return relationshipSpecification
}
