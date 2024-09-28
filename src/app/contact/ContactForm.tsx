"use client";

import { Locale } from "@/i18n/locales";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Section from "../_components/pages/Section";
import { sendEmail } from "../_components/utils/api/mailer";
import Alert, { AlertType } from "../_components/utils/ui/Alert";
import { Button } from "../_components/utils/ui/Button";
import Form, { Input, Textarea } from "../_components/utils/ui/Form";

export type FormData = {
    name: string,
    email: string,
    subject: string,
    message: string
}

export type FormStatus = {
    type: AlertType,
    message: string
}

export type AbstractInput = {
    key: string,
    type: string
}

export function useInputs(): AbstractInput[] {
    return [
        { key: "name", type: "text" },
        { key: "email", type: "email" },
        { key: "subject", type: "text" }
    ]
}

export type AbstractTextarea = {
    key: string
}

export function useTextareas(): AbstractTextarea[] {
    return [
        { key: "message" }
    ]
}

export default function ContactForm({ target_mail, recaptchaKey } : { target_mail: string, recaptchaKey: string }) {
    const currentLocale = useLocale() as Locale;

    const t = useTranslations("contact.contact_form");
    const inputs = useInputs();
    const textareas = useTextareas();

    const [pending, setPending] = useState(false);
    const [sent, setSent] = useState(false);

    const [status, setStatus] = useState<FormStatus>();

    const [captcha, setCaptcha] = useState<string | null>();

    const handleSubmit = async(event: any) => {
        event.preventDefault();

        const data = {
            name: event.target.name.value,
            email: event.target.email.value,
            subject: event.target.subject.value,
            message: event.target.message.value,
        } as FormData;

        if(!data.name || !data.email || !data.subject || !data.message) {
            setStatus({type: AlertType.ERROR, message: t("alerts.fields_missing") });

            return;
        }

        if(!captcha) {
            setStatus({type: AlertType.ERROR, message: t("alerts.recaptcha_invalid") });

            return;
        }


        setPending(true);
        setStatus({type: AlertType.LOADING, message: t("alerts.sending") });

        const result = await sendEmail({
            from: {
                name: data.name,
                address: data.email,
            },
            sender: data.email,
            to: target_mail,
            replyTo: data.email,
            subject: `[agonkolgeci.com] ${data.subject}`,
            text: data.message
        });

        setPending(false);
        setSent(result);

        if(result) {
            setStatus({type: AlertType.SUCCESS, message: t("alerts.sended") });
        } else {
            setStatus({type: AlertType.ERROR, message: t("alerts.unknown_error") });
        }
    }

    return (
        <Section title={t("title")} description={t("description")} position={0}>
            <div className="flex flex-col gap-8 max-w-xl w-full">
                <Form className={`flex flex-col gap-8`} onSubmit={handleSubmit}>
                    {inputs.map(input => {
                        const input_path = (`inputs.${input.key}`);

                        return (
                            <Input 
                                {...input} 
                                key={input.key}
                                id={input.key}

                                label={t(`${input_path}.label`)}
                                placeholder={t(`${input_path}.placeholder`)}

                                required
                                disabled={pending || sent}
                            />
                        )
                    })}

                    {textareas.map(textarea => {
                        const textarea_path = (`textareas.${textarea.key}`);

                        return (
                            <Textarea 
                                {...textarea}
                                key={textarea.key}
                                id={textarea.key}

                                label={t(`${textarea_path}.label`)}

                                required
                                disabled={pending || sent}
                            />
                        )
                    })}

                    {!sent ? <ReCAPTCHA sitekey={recaptchaKey} onChange={setCaptcha} hl={currentLocale} /> : null}
                    {status ? <Alert type={status.type} message={status.message} /> : null}

                    {!sent ? (
                        <div className="flex">
                            <Button type="submit" disabled={pending || sent}>
                                <p>{t("submit")}</p>
                            </Button>
                        </div>
                    ): null}
                </Form>
            </div>
        </Section>
    )
}