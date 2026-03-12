import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {NodeType} from "../NodeType"

export const ProgrammeEpisodeRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.ProgrammeEpisodeBelongsToProgramme, {
        startNodeType: NodeType.ProgrammeEpisode,
        endNodeType: NodeType.Programme,
        isReverseRelationship: true,
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
    //
]
