import {DbNodeType} from "../../src/db/types/DbNodeType"
import {RelationshipTypeLabelOld} from "./types/RelationshipTypeLabelOld"

export function getCountryRelationshipType(startNode: DbNodeType) {
    const mapping = new Map<DbNodeType, RelationshipTypeLabelOld>([
        [DbNodeType.Price, RelationshipTypeLabelOld.PriceInCountry],
        [DbNodeType.RaceTrack, RelationshipTypeLabelOld.RaceTrackLocatedInCountry],
        [DbNodeType.Magazine, RelationshipTypeLabelOld.MagazineOriginatesFromCountry],
        [DbNodeType.MotorShow, RelationshipTypeLabelOld.MotorShowLocatedInCountry],
    ])

    const relationship = mapping.get(startNode)

    if (!relationship) {
        throw new Error(`Node type "${startNode}" has no country relationship.`)
    }

    return relationship
}
