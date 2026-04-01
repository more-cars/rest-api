import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {NodeType} from "../NodeType"

export const ProgrammeRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.ProgrammeHasEpisode, {
        startNodeType: NodeType.Programme,
        endNodeType: NodeType.ProgrammeEpisode,
        isReverseRelationship: false,
    }],
    [RelationshipType.ProgrammeHasImage, {
        startNodeType: NodeType.Programme,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.ProgrammeHasPrimeImage, {
        startNodeType: NodeType.Programme,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.ProgrammeHasVideo, {
        startNodeType: NodeType.Programme,
        endNodeType: NodeType.Video,
        isReverseRelationship: false,
    }],
    [RelationshipType.ProgrammeHasMainVideo, {
        startNodeType: NodeType.Programme,
        endNodeType: NodeType.Video,
        isReverseRelationship: false,
    }],
    //
]
