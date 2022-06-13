export declare function get(testId: string): Element;
export declare function getByText(text: string): Element;
export declare function getByCss(css: string): Element;
export declare function checkAttribute(element: Element, attr: string, value: string): void;
export declare function waitForElement(testId: string, timeout?: number): Promise<Element>;
