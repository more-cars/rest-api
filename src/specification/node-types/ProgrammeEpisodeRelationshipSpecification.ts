import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {NodeType} from "../NodeType"

export const ProgrammeEpisodeRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.ProgrammeEpisodeBelongsToProgramme, {
        startNodeType: NodeType.ProgrammeEpisode,
        endNodeType: NodeType.Programme,
        isReverseRelationship: true,
    }],
    [RelationshipType.ProgrammeEpisodeFollowsEpisode, {
        startNodeType: NodeType.ProgrammeEpisode,
        endNodeType: NodeType.ProgrammeEpisode,
        isReverseRelationship: true,
    }],
    [RelationshipType.ProgrammeEpisodeIsFollowedByEpisode, {
        startNodeType: NodeType.ProgrammeEpisode,
        endNodeType: NodeType.ProgrammeEpisode,
        isReverseRelationship: false,
    }],
    [RelationshipType.ProgrammeEpisodeCoversCarModel, {
        startNodeType: NodeType.ProgrammeEpisode,
        endNodeType: NodeType.CarModel,
        isReverseRelationship: false,
    }],
    [RelationshipType.ProgrammeEpisodeFeaturesCarModelVariant, {
        startNodeType: NodeType.ProgrammeEpisode,
        endNodeType: NodeType.CarModelVariant,
        isReverseRelationship: false,
    }],
    [RelationshipType.ProgrammeEpisodeHasImage, {
        startNodeType: NodeType.ProgrammeEpisode,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.ProgrammeEpisodeHasPrimeImage, {
        startNodeType: NodeType.ProgrammeEpisode,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.ProgrammeEpisodeHasVideo, {
        startNodeType: NodeType.ProgrammeEpisode,
        endNodeType: NodeType.Video,
        isReverseRelationship: false,
    }],
    [RelationshipType.ProgrammeEpisodeHasMainVideo, {
        startNodeType: NodeType.ProgrammeEpisode,
        endNodeType: NodeType.Video,
        isReverseRelationship: false,
    }],
    //
]
