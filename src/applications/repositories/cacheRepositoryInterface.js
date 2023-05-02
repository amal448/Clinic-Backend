import { redisRepository } from "../../frameworks/database/redis/setCache";

const setCache = async (catchingOptions) => await repository.setCache(catchingOptions)

export const cacheRepositoryInterface = (repository) => {

    return {
        setCache
    }
}
