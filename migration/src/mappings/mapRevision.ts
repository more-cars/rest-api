import {Node} from "neo4j-driver"
import type {InputRevisionCreate} from "../../../src/db/node-types/revisions/types/InputRevisionCreate"
import {NodeTypeMappingReversed} from "../NodeTypeMappingReversed"

export function mapRevision(oldNode: Node): InputRevisionCreate {
    const data = oldNode.properties

    data.node_type = NodeTypeMappingReversed.get(data.node_type.replace('App\\Nodes\\', '').toLowerCase())
    data.node_id = data.node_id + 10_000_000
    data.node_created_at = data.original_created_at.replace(' ', 'T').concat('Z')
    data.node_updated_at = data.original_updated_at.replace(' ', 'T').concat('Z')

    delete data.original_created_at
    delete data.original_updated_at
    delete data._slug
    delete data._title
    delete data.quality_index

    return data as InputRevisionCreate
}