export interface BuildVdOpenUrlArgs {
    dashboardOrigin: string;
    externalViewUrl: string;
}

export const buildVdOpenUrl = ({ dashboardOrigin, externalViewUrl }: BuildVdOpenUrlArgs): string => {
    const origin = dashboardOrigin.endsWith("/") ? dashboardOrigin.slice(0, -1) : dashboardOrigin;
    const url = new URL(`${origin}/dashboard`);
    url.searchParams.set("external_view_url", externalViewUrl);
    return url.toString();
};
