import type {Request} from "express"
import crypto from "crypto"
import {getAnalyticsUrl} from "./getAnalyticsUrl"

const MATOMO_SITE_ID = "2"

type MatomoEvent = {
    category: string
    action: string
    name?: string
    value?: number
}

type TrackOptions = {
    action: string
    url?: string
    userId?: string
    event?: MatomoEvent
}

export async function trackVisit(req: Request, options: TrackOptions): Promise<void> {
    const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0] || req.socket.remoteAddress || ""
    const userAgent = req.headers["user-agent"] || ""
    const visitorId = crypto
        .createHash("md5")
        .update(ip + userAgent)
        .digest("hex")
        .substring(0, 16)

    const payload: Record<string, string | number> = {
        idsite: MATOMO_SITE_ID,
        rec: 1,
        apiv: 1,
        cookie: 0,

        // visitor
        cid: visitorId,
        ua: userAgent,
        uip: ip,

        // action
        action_name: options.action,
        url: options.url || `${req.protocol}://${req.get("host")}${req.originalUrl}`
    }

    if (options.userId) {
        payload.uid = options.userId
    }

    if (options.event) {
        payload.e_c = options.event.category
        payload.e_a = options.event.action

        if (options.event.name) payload.e_n = options.event.name
        if (options.event.value !== undefined) {
            payload.e_v = options.event.value
        }
    }

    await fetch(getAnalyticsUrl(), {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams(payload as Record<string, string>).toString(),
        }
    )
}
