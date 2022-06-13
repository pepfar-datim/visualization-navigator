import { ReactElement } from "react";
export declare function generateClickTest(method: (target: string) => void, methodParam: string, Page: ({ onClick }: {
    onClick: any;
}) => ReactElement<{
    onClick: () => void;
}, any>): void;
