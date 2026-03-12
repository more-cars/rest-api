import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {NodeType} from "../NodeType"

export const ProgrammeEpisodeRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.ProgrammeEpisodeCoversCarModel, {
        startNodeType: NodeType.ProgrammeEpisode,
        endNodeType: NodeType.CarModel,
        isReverseRelationship: false,
    }],
    //
]
