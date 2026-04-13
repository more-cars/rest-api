import {Node} from "neo4j-driver"
import type {InputRacingSessionCreate} from "../../../src/db/node-types/racing-sessions/types/InputRacingSessionCreate"

export function mapRacingSession(oldNode: Node): InputRacingSessionCreate {
    return {
        name: oldNode.properties.name,
        start_date: oldNode.properties.start_date,
        start_time: oldNode.properties.start_time,
        duration: isDuration(oldNode.properties.duration_unit) ? oldNode.properties.duration : null,
        duration_unit: isDuration(oldNode.properties.duration_unit) ? oldNode.properties.duration_unit : null,
        distance: isDistance(oldNode.properties.duration_unit) ? oldNode.properties.duration : null,
        distance_unit: isDistance(oldNode.properties.duration_unit) ? oldNode.properties.duration_unit : null,
    }
}

function isDuration(unit: string) {
    const units = [
        'minutes',
        'hours',
    ]

    return units.includes(unit)
}

function isDistance(unit: string) {
    const units = [
        'laps',
        'km',
        'miles',
    ]

    return units.includes(unit)
}
