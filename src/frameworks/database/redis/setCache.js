import { redisClient } from "../../../app";

export function redisRepository(redisClient) {
    const setCache = async ({
        key,
        expireTimeSec,
        data,
    }) => await redisClient.setEx(key, expireTimeSec, data);

    return {
        setCache,
    }
}
