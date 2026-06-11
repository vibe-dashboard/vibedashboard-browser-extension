export interface BuildVdOpenUrlArgs {
    dashboardOrigin: string;
    githubUrl: string;
}

export const buildVdOpenUrl = ({ dashboardOrigin, githubUrl }: BuildVdOpenUrlArgs): string => {
    const origin = dashboardOrigin.endsWith("/") ? dashboardOrigin.slice(0, -1) : dashboardOrigin;
    const url = new URL(`${origin}/dashboard`);
    url.searchParams.set("from_gh_url", githubUrl);
    return url.toString();
};
