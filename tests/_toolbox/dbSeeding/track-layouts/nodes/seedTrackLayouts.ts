import {TrackLayoutNode} from "../../../../../src/db/nodes/track-layouts/types/TrackLayoutNode"
import {seedTrackLayout} from "./seedTrackLayout"

export async function seedTrackLayouts(amount: number) {
    const trackLayouts: TrackLayoutNode[] = []

    for (let i = 0; i < amount; i++) {
        trackLayouts.push(await seedTrackLayout())
    }

    return trackLayouts
}
