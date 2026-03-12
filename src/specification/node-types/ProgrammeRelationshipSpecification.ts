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
    //
]
