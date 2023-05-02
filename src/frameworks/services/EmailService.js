import nodemailer from 'nodemailer';
const EmailService = () => {
    const sendAuthenticationEmail = async (recipientEmail, tempPassword) => {
        try {
            // create a nodemailer test account
            const testAccount = await nodemailer.createTestAccount();

            // create a nodemailer transporter using the test account details
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            });

            // create email message
            const mailOptions = {
                from: 'My App <myapp@example.com>',
                to: recipientEmail,
                subject: 'Authentication Email',
                text: `Hello,\n\nYour temporary password is: ${tempPassword}\n\n Go to this link http://127.0.0.1:3000/student/login and Sign In \n\n Please use this password to log in to your account and create a new Password. This email is auto-generated, so please do not reply.\n\nThank you.`
            };

            // send email
            const info = await transporter.sendMail(mailOptions);
            console.log('Message sent: %s', info.messageId);

            // log the URL to preview the email in the browser
            const information = nodemailer.getTestMessageUrl(info);
            console.log('inside the main service')
            console.log(information)
            return information;
        } catch (error) {
            console.error(error);
        }
    };

    return {
        sendAuthenticationEmail,
    }
}

export default EmailService;


