import { h } from "preact";

export const DownloadIcon = () => (
    <svg
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g>
            <path
                d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </g>
    </svg>
);

export const LeftAlignIcon = (props: preact.JSX.HTMLAttributes) => (
    // @ts-ignore - HTML attributes are valid for SVG
    <svg
        fill="#000000"
        width="800px"
        height="800px"
        viewBox="0 -2.5 29 29"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fill="currentColor"
            d="m1.334 2.666h26.665c.011 0 .024.001.037.001.737 0 1.334-.597 1.334-1.334s-.597-1.334-1.334-1.334c-.013 0-.026 0-.039.001h.002-26.665c-.72.021-1.296.61-1.296 1.333s.576 1.312 1.294 1.333h.002z"
        />
        <path
            fill="currentColor"
            d="m1.334 7.999h19.555c.011 0 .024.001.037.001.737 0 1.334-.597 1.334-1.334s-.597-1.334-1.334-1.334c-.013 0-.026 0-.039.001h.002-19.555c-.72.021-1.296.61-1.296 1.333s.576 1.312 1.294 1.333h.002z"
        />
        <path
            fill="currentColor"
            d="m27.999 10.667h-26.665c-.72.021-1.296.61-1.296 1.333s.576 1.312 1.294 1.333h.002 26.665c.72-.021 1.296-.61 1.296-1.333s-.576-1.312-1.294-1.333z"
        />
        <path
            fill="currentColor"
            d="m27.999 21.333h-26.665c-.72.021-1.296.61-1.296 1.333s.576 1.312 1.294 1.333h.002 26.665c.72-.021 1.296-.61 1.296-1.333s-.576-1.312-1.294-1.333z"
        />
        <path
            fill="currentColor"
            d="m1.334 18.666h19.555c.72-.021 1.296-.61 1.296-1.333s-.576-1.312-1.294-1.333h-.002-19.555c-.72.021-1.296.61-1.296 1.333s.576 1.312 1.294 1.333z"
        />
    </svg>
);

export const CenterAlignIcon = (props: preact.JSX.HTMLAttributes) => (
    // @ts-ignore - HTML attributes are valid for SVG
    <svg
        width="800px"
        height="800px"
        viewBox="0 -2.5 29 29"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fill="currentColor"
            d="m1.334 2.666h26.665c.011 0 .024.001.037.001.737 0 1.334-.597 1.334-1.334s-.597-1.334-1.334-1.334c-.013 0-.026 0-.039.001h.002-26.665c-.72.021-1.296.61-1.296 1.333s.576 1.312 1.294 1.333h.002z"
        />
        <path
            fill="currentColor"
            d="m4.889 5.333c-.011 0-.024-.001-.037-.001-.737 0-1.334.597-1.334 1.334s.597 1.334 1.334 1.334c.013 0 .026 0 .039-.001h-.002 19.555c.72-.021 1.296-.61 1.296-1.333s-.576-1.312-1.294-1.333h-.002z"
        />
        <path
            fill="currentColor"
            d="m27.999 10.667h-26.665c-.72.021-1.296.61-1.296 1.333s.576 1.312 1.294 1.333h.002 26.665c.72-.021 1.296-.61 1.296-1.333s-.576-1.312-1.294-1.333z"
        />
        <path
            fill="currentColor"
            d="m27.999 21.333h-26.665c-.72.021-1.296.61-1.296 1.333s.576 1.312 1.294 1.333h.002 26.665c.72-.021 1.296-.61 1.296-1.333s-.576-1.312-1.294-1.333z"
        />
        <path
            fill="currentColor"
            d="m24.444 18.666c.72-.021 1.296-.61 1.296-1.333s-.576-1.312-1.294-1.333h-.002-19.555c-.72.021-1.296.61-1.296 1.333s.576 1.312 1.294 1.333h.002z"
        />
    </svg>
);

export const RightAlignIcon = (props: preact.JSX.HTMLAttributes) => (
    // @ts-ignore - HTML attributes are valid for SVG
    <svg
        width="800px"
        height="800px"
        viewBox="0 -2.5 29 29"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fill="currentColor"
            d="m27.999 21.333h-26.665c-.72.021-1.296.61-1.296 1.333s.576 1.312 1.294 1.333h.002 26.665c.72-.021 1.296-.61 1.296-1.333s-.576-1.312-1.294-1.333z"
        />
        <path
            fill="currentColor"
            d="m27.999 16h-19.555c-.72.021-1.296.61-1.296 1.333s.576 1.312 1.294 1.333h.002 19.555c.72-.021 1.296-.61 1.296-1.333s-.576-1.312-1.294-1.333z"
        />
        <path
            fill="currentColor"
            d="m27.999 10.667h-26.665c-.72.021-1.296.61-1.296 1.333s.576 1.312 1.294 1.333h.002 26.665c.72-.021 1.296-.61 1.296-1.333s-.576-1.312-1.294-1.333z"
        />
        <path
            fill="currentColor"
            d="m1.334 2.666h26.665c.011 0 .024.001.037.001.737 0 1.334-.597 1.334-1.334s-.597-1.334-1.334-1.334c-.013 0-.026 0-.039.001h.002-26.665c-.72.021-1.296.61-1.296 1.333s.576 1.312 1.294 1.333h.002z"
        />
        <path
            fill="currentColor"
            d="m27.999 5.333h-19.555c-.011 0-.024-.001-.037-.001-.737 0-1.334.597-1.334 1.334s.597 1.334 1.334 1.334c.013 0 .026 0 .039-.001h-.002 19.555c.72-.021 1.296-.61 1.296-1.333s-.576-1.312-1.294-1.333z"
        />
    </svg>
);

export const SocialMediaHeartIcon = (props: preact.JSX.HTMLAttributes) => (
    // @ts-ignore - HTML attributes are valid for SVG
    <svg viewBox="0 0 24 24" {...props}>
        <path
            d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
            fill="currentColor"
            stroke="currentColor"
        ></path>
    </svg>
);

export const SocialMediaCommentIcon = (props: preact.JSX.HTMLAttributes) => (
    // @ts-ignore - HTML attributes are valid for SVG
    <svg viewBox="0 0 24 24" {...props}>
        <path
            d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"
            fill="currentColor"
            stroke="currentColor"
        ></path>
    </svg>
);

export const SocialMediaViewsIcon = (props: preact.JSX.HTMLAttributes) => (
    // @ts-ignore - HTML attributes are valid for SVG
    <svg viewBox="0 0 24 24" {...props}>
        <path
            d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"
            fill="currentColor"
            stroke="currentColor"
        ></path>
    </svg>
);

export const SocialMediaRepostIcon = (props: preact.JSX.HTMLAttributes) => (
    // @ts-ignore - HTML attributes are valid for SVG
    <svg viewBox="0 0 24 24" {...props}>
        <path
            d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"
            fill="currentColor"
            stroke="currentColor"
        ></path>
    </svg>
);

export const BackspaceIcon = (props: preact.JSX.HTMLAttributes) => (
    // @ts-ignore - HTML attributes are valid for SVG
    <svg
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M19,5H9.83a3,3,0,0,0-2.12.88L2.29,11.29a1,1,0,0,0,0,1.42l5.42,5.41A3,3,0,0,0,9.83,19H19a3,3,0,0,0,3-3V8A3,3,0,0,0,19,5Zm1,11a1,1,0,0,1-1,1H9.83a1.05,1.05,0,0,1-.71-.29L4.41,12,9.12,7.29A1.05,1.05,0,0,1,9.83,7H19a1,1,0,0,1,1,1ZM16.71,9.29a1,1,0,0,0-1.42,0L14,10.59l-1.29-1.3a1,1,0,0,0-1.42,1.42L12.59,12l-1.3,1.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L14,13.41l1.29,1.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L15.41,12l1.3-1.29A1,1,0,0,0,16.71,9.29Z" />
    </svg>
);

export const PlusIcon = (props: preact.JSX.HTMLAttributes) => (
    // @ts-ignore - HTML attributes are valid for SVG
    <svg
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z" />
    </svg>
);

export const SpaceKeyIcon = (props: preact.JSX.HTMLAttributes) => (
    // @ts-ignore - HTML attributes are valid for SVG
    <svg
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        {...props}
    >
        <path d="M21,9a1,1,0,0,0-1,1v3H4V10a1,1,0,0,0-2,0v4a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V10A1,1,0,0,0,21,9Z" />
    </svg>
);

export const ResetIcon = (props: preact.JSX.HTMLAttributes) => (
    // @ts-ignore - HTML attributes are valid for SVG
    <svg
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        {...props}
    >
        <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,0,1-8-8A7.92,7.92,0,0,1,5.69,7.1L16.9,18.31A7.92,7.92,0,0,1,12,20Zm6.31-3.1L7.1,5.69A7.92,7.92,0,0,1,12,4a8,8,0,0,1,8,8A7.92,7.92,0,0,1,18.31,16.9Z" />
    </svg>
);

export const CancelIcon = (props: preact.JSX.HTMLAttributes) => (
    // @ts-ignore - HTML attributes are valid for SVG
    <svg
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        {...props}
    >
        <path d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z" />
    </svg>
);

export const EnterKeyIcon = (props: preact.JSX.HTMLAttributes) => (
    // @ts-ignore - HTML attributes are valid for SVG
    <svg
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M19,6a1,1,0,0,0-1,1v4a1,1,0,0,1-1,1H7.41l1.3-1.29A1,1,0,0,0,7.29,9.29l-3,3a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l3,3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L7.41,14H17a3,3,0,0,0,3-3V7A1,1,0,0,0,19,6Z" />
    </svg>
);
