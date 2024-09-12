"use server";

import nodemailer from "nodemailer";

export async function sendEmail(props: any) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env["GOOGLE_MAIL_USER"],
            pass: process.env["GOOGLE_MAIL_PASSWORD"]
        }
    });

    try {
        const mail = await transporter.sendMail({...props});

        return true;
    } catch(error) {
        return false;
    }
}