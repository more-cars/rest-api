import {getVideoById} from "./youtube/getVideoById"

export const YouTubeFacade = {
    async getVideoById(id: string) {
        return getVideoById(id)
    },
}
