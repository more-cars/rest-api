import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {NodeType} from "../NodeType"

export const MagazineIssueRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.MagazineIssueBelongsToMagazine, {
        startNodeType: NodeType.MagazineIssue,
        endNodeType: NodeType.Magazine,
        isReverseRelationship: true,
    }],
    [RelationshipType.MagazineIssueFollowsIssue, {
        startNodeType: NodeType.MagazineIssue,
        endNodeType: NodeType.MagazineIssue,
        isReverseRelationship: true,
    }],
    [RelationshipType.MagazineIssueFollowedByIssue, {
        startNodeType: NodeType.MagazineIssue,
        endNodeType: NodeType.MagazineIssue,
        isReverseRelationship: false,
    }],
    [RelationshipType.MagazineIssueCoversCarModel, {
        startNodeType: NodeType.MagazineIssue,
        endNodeType: NodeType.CarModel,
        isReverseRelationship: false,
    }],
    [RelationshipType.MagazineIssuePresentsCarModelVariant, {
        startNodeType: NodeType.MagazineIssue,
        endNodeType: NodeType.CarModelVariant,
        isReverseRelationship: false,
    }],
    [RelationshipType.MagazineIssueReviewedCarModelVariantWithRating, {
        startNodeType: NodeType.MagazineIssue,
        endNodeType: NodeType.Rating,
        isReverseRelationship: true,
    }],
    [RelationshipType.MagazineIssueCoversRacingEvent, {
        startNodeType: NodeType.MagazineIssue,
        endNodeType: NodeType.RacingEvent,
        isReverseRelationship: false,
    }],
    [RelationshipType.MagazineIssueHasImage, {
        startNodeType: NodeType.MagazineIssue,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.MagazineIssueHasPrimeImage, {
        startNodeType: NodeType.MagazineIssue,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.MagazineIssueHasVideo, {
        startNodeType: NodeType.MagazineIssue,
        endNodeType: NodeType.Video,
        isReverseRelationship: false,
    }],
    [RelationshipType.MagazineIssueHasMainVideo, {
        startNodeType: NodeType.MagazineIssue,
        endNodeType: NodeType.Video,
        isReverseRelationship: false,
    }],
    //
]
