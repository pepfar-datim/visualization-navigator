// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import datimApi from "@pepfar-react-lib/datim-api"
import fetch from "node-fetch";
import {TextDecoder} from "util";

//@ts-ignore
global.fetch = fetch;
//@ts-ignore
global.TextDecoder = TextDecoder;
datimApi.register(process.env.NODE_ENV, process.env.REACT_APP_BASE_URL)
datimApi.setTestUsername(`jflaska`,`Basic amZsYXNrYTpHcmVlbjE4IQ==`);
