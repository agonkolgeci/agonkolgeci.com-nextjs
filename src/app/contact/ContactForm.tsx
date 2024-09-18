"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../_components/utils/ui/Button";
import Form, { Input, Textarea } from "../_components/utils/ui/Form";
import { faCheck, faCircleInfo, faPaperPlane, faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { sendEmail } from "../_components/utils/api/mailer";
import { CONTACT_URL } from "../_components/utils/ExternalLink";
import ReCAPTCHA from "react-google-recaptcha";
import Alert, { AlertType } from "../_components/utils/ui/Alert";

export type FormStatus = {
    type: AlertType,
    message: string
}

export default function ContactForm({ recaptchaKey } : { recaptchaKey: string }) {
    const [pending, setPending] = useState(false);
    const [sent, setSent] = useState(false);

    const [status, setStatus] = useState<FormStatus>();

    const [captcha, setCaptcha] = useState<string | null>();

    const handleSubmit = async(event: any) => {
        event.preventDefault();

        if(!event.target.name.value || !event.target.email.value || !event.target.subject.value || !event.target.message.value) {
            setStatus({type: AlertType.ERROR, message: "Please fill out all required fields in the form before submitting." });

            return;
        }

        if(!captcha) {
            setStatus({type: AlertType.ERROR, message: "Please complete the reCAPTCHA verification before submitting." });

            return;
        }


        setPending(true);
        setStatus({type: AlertType.LOADING, message: "Your message is being sent..." });

        const result = await sendEmail({
            from: {
                name: event.target.name.value,
                address: event.target.email.value,
            },
            sender: event.target.email.value,
            to: CONTACT_URL.name,
            replyTo: event.target.email.value,
            subject: `[agonkolgeci.com] ${event.target.subject.value}`,
            text: event.target.message.value
        });

        setPending(false);
        setSent(result);

        if(result) {
            setStatus({type: AlertType.SUCCESS, message: "Thank you for your message. I have received it and will get back to you shortly by e-mail." });
        } else {
            setStatus({type: AlertType.ERROR, message: "Sorry, but an error occurred and your message could not be sent. Please try again later." });
        }
    }

    return (
        <div className="flex flex-col gap-8 max-w-xl w-full">
            <Form className={`flex flex-col gap-8`} onSubmit={handleSubmit}>
                <Input id="name" type="text" name="Name" placeholder="Agon KOLGECI" required disabled={pending || sent} />
                <Input id="email" type="email" name="E-mail" placeholder="contact@agonkolgeci.com" required disabled={pending || sent} />
                <Input id="subject" type="text" name="Subject" placeholder="Collaboration" required disabled={pending || sent} />
                <Textarea id="message" name="Message" required disabled={pending || sent} />

                {!sent ? <ReCAPTCHA sitekey={recaptchaKey} onChange={setCaptcha} /> : null}
                {status ? <Alert type={status.type} message={status.message} /> : null}

                {!sent ? (
                    <div className="flex">
                        <Button type="submit" disabled={pending || sent}>
                            <p>Submit</p>
                        </Button>
                    </div>
                ): null}
            </Form>
        </div>
    )
}