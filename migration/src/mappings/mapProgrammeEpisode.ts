import {Node} from "neo4j-driver"
import type {InputProgrammeEpisodeCreate} from "../../../src/db/node-types/programme-episodes/types/InputProgrammeEpisodeCreate"

export function mapProgrammeEpisode(oldNode: Node): InputProgrammeEpisodeCreate {
    return {
        title: oldNode.properties.name,
        season_number: oldNode.properties.season,
        season_episode_number: oldNode.properties.season_episode,
        original_air_date: oldNode.properties.air_date,
        duration: oldNode.properties.duration,
    }
}
