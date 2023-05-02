import { EmailServiceReturn } from "../../frameworks/services/EmailService";

export const EmailServiceInterfaces = (service) => {
    const sendEmail = async (senderEmail, tempPassword) => await service.sendAuthenticationEmail(senderEmail, tempPassword)

    return {
        sendEmail,
    }
}
