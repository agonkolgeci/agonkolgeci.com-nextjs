"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../_components/utils/ui/buttons";
import Form, { Input, Textarea } from "../_components/utils/ui/forms";
import { faCheck, faCircleInfo, faPaperPlane, faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { sendEmail } from "../_components/utils/api/mailer";
import { CONTACT_URL } from "../_components/utils/links";
import ReCAPTCHA from "react-google-recaptcha";

export type FormData = {
    name: string
    email: string
    subject: string
    message: string
};

export type FormStatus = {
    message: string,
    color: string,
    icon?: IconProp
    animate?: boolean
}

export default function ContactForm({ recaptchaKey } : { recaptchaKey: string }) {
    const [pending, setPending] = useState(false);
    const [sent, setSent] = useState(false);

    const [status, setStatus] = useState<FormStatus>();

    const [captcha, setCaptcha] = useState<string | null>();

    const handleSubmit = async(event: any) => {
        event.preventDefault();

        if(!event.target.name.value || !event.target.email.value || !event.target.subject.value || !event.target.message.value) {
            setStatus({message: "Please fill out all required fields in the form before submitting.", color: "text-red-500"});

            return;
        }

        if(!captcha) {
            setStatus({message: "Please complete the reCAPTCHA verification before submitting.", color: "text-red-500"});

            return;
        }


        setPending(true);
        setStatus({message: "Your message is in the process of being sent...", color: "text-orange-500", icon: faSpinner, animate: true});

        const result = await sendEmail({
            from: {
                name: event.target.name.value,
                address: event.target.email.value,
            },
            sender: event.target.email.value,
            to: CONTACT_URL.name,
            replyTo: event.target.email.value,
            subject: event.target.subject.value,
            text: event.target.message.value
        });

        setPending(false);
        setSent(result);

        if(result) {
            setStatus({message: "Thank you for your message. I have received it and will get back to you shortly by e-mail.", color: "text-green-500", icon: faCheck});
        } else {
            setStatus({message: "Sorry, but an error occurred and your message could not be sent. Please try again later.", color: "text-red-500", icon: faXmark});
        }
    }   

    return (
        <div className="flex flex-grow flex-col gap-8 max-w-xl w-full">
            <div className={`${status ? "flex" : "hidden" } flex-row items-center gap-4 ${status?.color}`}>
                <FontAwesomeIcon icon={status?.icon ? status.icon : faCircleInfo} className={`text-xl ${status?.animate ? "animate-spin": null}`} />
                        
                <p>{status?.message}</p>
            </div>

            <Form className={`${sent ? "hidden": "flex"} flex-col gap-8`} onSubmit={handleSubmit}>
                <Input id="name" type="text" name="Name" placeholder="Agon KOLGECI" required disabled={pending} />
                <Input id="email" type="email" name="E-mail" placeholder="contact@agonkolgeci.com" required disabled={pending} />
                <Input id="subject" type="text" name="Subject" placeholder="Collaboration" required disabled={pending} />
                <Textarea id="message" name="Message" required disabled={pending} />
                <ReCAPTCHA sitekey={recaptchaKey} onChange={setCaptcha} />

                <Button type="submit" disabled={pending}>
                    <p>Submit</p>
                    <FontAwesomeIcon icon={pending ? faSpinner : faPaperPlane} className={`${pending ? "animate-spin" : null}`} />
                </Button>
            </Form>
        </div>
    )
}