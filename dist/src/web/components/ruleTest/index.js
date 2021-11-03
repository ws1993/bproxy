"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const input_1 = __importDefault(require("antd/es/input"));
const socket_1 = require("../../modules/socket");
const jsonFormat_1 = __importDefault(require("../../libs/jsonFormat"));
require("antd/es/input/style/css");
require("./index.scss");
const invoke = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const rs = yield (0, socket_1.testRule)(url);
    return rs;
});
exports.default = () => {
    const [result, setResult] = (0, react_1.useState)('');
    const onEnterPress = (e) => __awaiter(void 0, void 0, void 0, function* () {
        if (e.keyCode === 13 && e.target.value) {
            const rs = yield invoke(e.target.value.trim());
            try {
                setResult((0, jsonFormat_1.default)(rs, null, 2, 100));
            }
            catch (err) { }
        }
    });
    return (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "test-page" }, { children: [(0, jsx_runtime_1.jsx)(input_1.default, { onKeyDown: onEnterPress }, void 0), (0, jsx_runtime_1.jsx)("pre", { children: (0, jsx_runtime_1.jsx)("code", { children: result }, void 0) }, void 0)] }), void 0);
};
