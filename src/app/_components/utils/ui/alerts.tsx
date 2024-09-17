"use client";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCheckCircle, faCircleInfo, faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export enum AlertType {
    SUCCESS,
    LOADING,
    INFO,
    ERROR
}

export type AlertProps = {
    background: string,
    color: string,
    icon: {
        type: IconProp,
        color?: string,
        animation?: string
    }
}

export const AlertOptions: Record<AlertType, AlertProps> = {
    [AlertType.SUCCESS]: {
        background: "bg-green-400",
        color: "text-white",
        icon: {
            type: faCheckCircle,
            color: "text-green-800"
        }
    },


    [AlertType.LOADING]: {
        background: "bg-orange-400",
        color: "text-white",
        icon: {
            type: faSpinner,
            color: "text-orange-800",
            animation: "animate-spin"
        }
    },

    [AlertType.INFO]: {
        background: "bg-gray-400",
        color: "text-white",
        icon: {
            type: faCircleInfo,
            color: "text-gray-800"
        }
    },

    [AlertType.ERROR]: {
        background: "bg-red-400",
        color: "text-white",
        icon: {
            type: faXmark,
            color: "text-red-800"
        }
    }
}

export default function Alert({ type, props = AlertOptions[type], message }: { type: AlertType, props?: AlertProps, message: string }) {
    return (
        <div className={`flex flex-row items-center gap-4 rounded-lg px-4 py-2 ${props.background}`}>
            <FontAwesomeIcon icon={props.icon.type} className={`text-xl ${props.icon.color} ${props.icon.animation}`} />

            <p className={`${props.color}`}>{message}</p>
        </div>
    )
}