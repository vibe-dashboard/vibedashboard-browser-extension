import classNames from "classnames";
import { useEffect, useMemo, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { useStorage } from "@plasmohq/storage/hook";

import { DEFAULT_VD_ENDPOINT, EVENT_CURRENT_URL_CHANGED } from "~constants";
import { OnaLettermark } from "~icons/OnaLettermark";
import { STORAGE_KEY_ADDRESS, STORAGE_KEY_NEW_TAB } from "~storage";
import { buildVdOpenUrl } from "~utils/build-vd-open-url";

import type { SupportedApplication } from "./button-contributions";

type Props = {
    application: SupportedApplication;
    additionalClassNames?: string[];
    urlTransformer?: (url: string) => string;
};
export const OnaButton = ({ application, additionalClassNames, urlTransformer }: Props) => {
    const [address] = useStorage<string>(STORAGE_KEY_ADDRESS, DEFAULT_VD_ENDPOINT);
    const [openInNewTab] = useStorage<boolean>(STORAGE_KEY_NEW_TAB, true);
    const [currentHref, setCurrentHref] = useState(window.location.href);

    const linkRef = useRef<HTMLAnchorElement | null>(null);

    useEffect(() => {
        const handleUrlChange = () => {
            setCurrentHref(window.location.href);
        };

        document.addEventListener(EVENT_CURRENT_URL_CHANGED, handleUrlChange);

        return () => {
            document.removeEventListener(EVENT_CURRENT_URL_CHANGED, handleUrlChange);
        };
    }, []);

    const actions = useMemo(() => {
        const parsedHref = !urlTransformer ? currentHref : urlTransformer(currentHref);
        const href = buildVdOpenUrl({
            dashboardOrigin: address,
            githubUrl: parsedHref,
        });

        return [
            {
                href,
                label: "Vibe",
            },
        ];
    }, [address, currentHref, urlTransformer]);

    const target = openInNewTab ? "_blank" : "_self";

    // useHotkeys("alt+g", () => linkRef.current?.click(), [linkRef.current]);

    return (
        <div
            id="ona-btn-nav"
            title={`Open in Vibe Dashboard`}
            className={classNames("ona-button", application, ...(additionalClassNames ?? []))}
        >
            <div className={classNames("button")}>
                <a
                    className={classNames("button-part", "action-no-options")}
                    href={actions[0].href}
                    target={target}
                    rel="noreferrer"
                    ref={linkRef}
                >
                    <span className={classNames("action-label")}>
                        {actions[0].label}
                    </span>
                </a>
            </div>
        </div>
    );
};
