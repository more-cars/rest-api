import type {DbRelationship} from "../../src/db/types/DbRelationship"
import type {NodeTypeLabel} from "../../src/db/NodeTypeLabel"
import {
    deleteAllBrandHasCarModelRelationships
} from "../../tests/_toolbox/dbSeeding/brands/relationships/deleteAllBrandHasCarModelRelationships"
import {
    deleteAllNodeHasImageRelationships
} from "../../tests/_toolbox/dbSeeding/images/relationships/deleteAllNodeHasImageRelationships"
import {
    deleteAllHasPrimeImageRelationships
} from "../../tests/_toolbox/dbSeeding/images/relationships/deleteAllHasPrimeImageRelationships"

export function deleteRelationshipsOfType(relationshipType: DbRelationship, startNodeType: NodeTypeLabel) {
    switch (relationshipType) {
        case 'HAS_CAR_MODEL':
            return deleteAllBrandHasCarModelRelationships()
        case 'HAS_IMAGE':
            return deleteAllNodeHasImageRelationships(startNodeType)
        case 'HAS_PRIME_IMAGE':
            return deleteAllHasPrimeImageRelationships(startNodeType)
    }

    throw new Error('Unknown Node Type')
}
