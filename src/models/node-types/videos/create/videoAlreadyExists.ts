import {Video} from "../Video"

export async function videoAlreadyExists(externalId: string) {
    const videos = await Video.findAll({filterByProperty: 'external_id', filterValue: externalId})

    return videos.length > 0
}
