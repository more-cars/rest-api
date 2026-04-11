import {getImageById} from "./flickr/getImageById"

export const FlickrFacade = {
    async getImageById(id: string) {
        return getImageById(id)
    },
}
