import Button from "@codegouvfr/react-dsfr/Button";
import { createFileRoute } from "@tanstack/react-router";
import { protectedLoader, useOidc, getKeycloakAccountUrl } from "oidc";
import { useLang } from "i18n";
import { fr } from "@codegouvfr/react-dsfr";
import { useStyles } from "tss-react";

export const Route = createFileRoute("/account")({
    component: Account,
    beforeLoad: protectedLoader
});

function Account() {
    const { oidcTokens, renewTokens } = useOidc({ assertUserLoggedIn: true });

    const { lang } = useLang();

    const { cx, css } = useStyles();

    return (
        <>
            <a
                className={cx(
                    fr.cx("fr-mt-5w", "fr-mb-5w"),
                    css({
                        display: "inline-block"
                    })
                )}
                href={getKeycloakAccountUrl({
                    locale: lang,
                    accountPage: "password"
                })}
            >
                Change my password
            </a>
            <div>
                <p>OpenID Connect Access Token:</p>
                <p>{oidcTokens.accessToken}</p>
                <Button onClick={renewTokens}>Renew token</Button>
            </div>
        </>
    );
}
