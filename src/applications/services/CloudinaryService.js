import cloudinary from "../../frameworks/services/cloudinary";
import { CloudinaryReturn } from "../../frameworks/services/cloudinary";

export const CloudinaryServiceInterface = (service) => {
    const uploadImage = async (filePath) => {
        const url = await service.uploadImage(filePath)
        return url;
    }
    return {
        uploadImage,
    }
}

