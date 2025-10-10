const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    try {
        const data = JSON.parse(event.body);
        const { name, email, phone, inquiry_type, message } = data;
        
        if (!name || !email || !phone || !inquiry_type || !message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'All fields are required' })
            };
        }

        // Create email transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'townjamamasjid@gmail.com',
            replyTo: email,
            subject: `New Contact Form: ${inquiry_type} - ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: #0d5e3e; color: white; padding: 20px; text-align: center;">
                        <h1>New Contact Form Submission</h1>
                        <p>Town Jama Masjid Website</p>
                    </div>
                    <div style="padding: 20px; background: #f9f9f9;">
                        <div style="margin-bottom: 15px;">
                            <strong>Name:</strong> ${name}
                        </div>
                        <div style="margin-bottom: 15px;">
                            <strong>Email:</strong> ${email}
                        </div>
                        <div style="margin-bottom: 15px;">
                            <strong>Phone:</strong> ${phone}
                        </div>
                        <div style="margin-bottom: 15px;">
                            <strong>Inquiry Type:</strong> ${inquiry_type}
                        </div>
                        <div style="margin-bottom: 15px;">
                            <strong>Message:</strong><br>
                            <div style="margin-top: 10px; padding: 10px; background: white; border-left: 4px solid #0d5e3e;">
                                ${message.replace(/\n/g, '<br>')}
                            </div>
                        </div>
                        <div style="margin-bottom: 15px;">
                            <strong>Submitted:</strong> ${new Date().toLocaleString()}
                        </div>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            body: JSON.stringify({ 
                success: true, 
                message: 'Message sent successfully!' 
            })
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: 'Failed to send message. Please try again later.' 
            })
        };
    }
};
