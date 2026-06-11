import { CheckIcon } from "lucide-react";
import { useCallback, useEffect, useState, type FormEvent, type PropsWithChildren } from "react";

import { Storage } from "@plasmohq/storage";
import { useStorage } from "@plasmohq/storage/hook";

import { Button } from "~components/forms/Button";
import { InputField } from "~components/forms/InputField";
import { TextInput } from "~components/forms/TextInputField";
import { DEFAULT_VD_ENDPOINT } from "~constants";
import { useTemporaryState } from "~hooks/use-temporary-state";
import { STORAGE_KEY_ADDRESS, STORAGE_KEY_NEW_TAB } from "~storage";
import { parseEndpoint } from "~utils/parse-endpoint";

import "./popup.css";

const storage = new Storage();

const Animate = ({ children, on }: PropsWithChildren<{ on?: string }>) => {
    return on === undefined ? (
        <div>{children}</div>
    ) : (
        // see popup.css for transition styles
        <div className="fade-in" key={on}>
            {children}
        </div>
    );
};

function PopupContent() {
    const [error, setError] = useState<string>();

    const [storedAddress] = useStorage<string>(STORAGE_KEY_ADDRESS, DEFAULT_VD_ENDPOINT);
    const [address, setAddress] = useState<string>(storedAddress);
    const [justSaved, setJustSaved] = useTemporaryState(false, 2000);

    const updateAddress = useCallback(
        (e: FormEvent) => {
            e.preventDefault();

            try {
                const parsedAddress = parseEndpoint(address);

                storage
                    .setItem(STORAGE_KEY_ADDRESS, parsedAddress)
                    .catch((e) => {
                        setError(e.message);
                    })
                    .then(() => {
                        setJustSaved(true);
                    });
            } catch (e) {
                setError(e.message);
            }
        },
        [address, setError],
    );

    // Need to update address when storage changes. This also applies for the initial load.
    useEffect(() => {
        setAddress(storedAddress);
    }, [storedAddress]);

    const [openInNewTab, setOpenInNewTab] = useStorage<boolean>(STORAGE_KEY_NEW_TAB, true);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                minWidth: "360px",
                padding: "16px",
            }}
            className="ona"
        >
            <form className="w-full" onSubmit={updateAddress} action="#">
                <InputField
                    label={`Vibe Dashboard URL`}
                    hint={`Origin for your Vibe Dashboard server, e.g. ${DEFAULT_VD_ENDPOINT}.`}
                    topMargin={false}
                >
                    <div className="flex w-full h-10 max-w-sm items-center space-x-2">
                        <TextInput className="h-full" value={address} onChange={setAddress} />
                        <Button type="primary" onClick={updateAddress} className="w-20 h-full">
                            <Animate on={justSaved ? "check" : "save"}>
                                <span>{justSaved ? <CheckIcon size={16} /> : "Save"}</span>
                            </Animate>
                        </Button>
                    </div>
                </InputField>
                <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={openInNewTab}
                        onChange={(event) => setOpenInNewTab(event.target.checked)}
                    />
                    <span>Open Vibe Dashboard in a new tab</span>
                </label>
            </form>

            {/* show error if set */}
            <div
                style={
                    error
                        ? {
                              color: "red",
                              marginTop: "8px",
                              display: "inline",
                          }
                        : {
                              display: "none",
                          }
                }
            >
                {error}
            </div>
        </div>
    );
}

function IndexPopup() {
    return <PopupContent />;
}

export default IndexPopup;
