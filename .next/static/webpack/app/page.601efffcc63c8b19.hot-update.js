"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./components/common/Button.tsx":
/*!**************************************!*\
  !*** ./components/common/Button.tsx ***!
  \**************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Button: function() { return /* binding */ Button; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/dist/api/link.js\");\n/* __next_internal_client_entry_do_not_use__ Button auto */ \n\nconst Button = (param)=>{\n    let { text, logoUrl, backgroundColor, fontColor = \"white\", href, link = false, onClick, margin = 0 } = param;\n    const hoverBgColorClass = \"\".concat(backgroundColor === \"main\" ? \"hover:bg-mainShade\" : \"hover:bg-subShade\");\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"bg-\".concat(backgroundColor, \"  inline-block cursor-pointer text-center rounded px-5 py-2 \").concat(hoverBgColorClass),\n        children: [\n            logoUrl && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                src: logoUrl,\n                alt: \"logo\",\n                className: \"inline-block w-6 h-6 mr-2 align-middle\"\n            }, void 0, false, {\n                fileName: \"/Users/sungyupju/dev/lifeisjazz_nextjs/components/common/Button.tsx\",\n                lineNumber: 33,\n                columnNumber: 9\n            }, undefined),\n            link ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n                href: href || \"/JamPortal\",\n                className: \"text-white no-underline font-regular\",\n                children: text\n            }, void 0, false, {\n                fileName: \"/Users/sungyupju/dev/lifeisjazz_nextjs/components/common/Button.tsx\",\n                lineNumber: 40,\n                columnNumber: 9\n            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                href: href,\n                className: \"no-underline font-regular text-\".concat(fontColor, \" align-middle\"),\n                onClick: (e)=>{\n                    if (onClick) {\n                        e.preventDefault();\n                        onClick();\n                    }\n                    return;\n                },\n                children: text\n            }, void 0, false, {\n                fileName: \"/Users/sungyupju/dev/lifeisjazz_nextjs/components/common/Button.tsx\",\n                lineNumber: 47,\n                columnNumber: 9\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/sungyupju/dev/lifeisjazz_nextjs/components/common/Button.tsx\",\n        lineNumber: 29,\n        columnNumber: 5\n    }, undefined);\n};\n_c = Button;\nvar _c;\n$RefreshReg$(_c, \"Button\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvY29tbW9uL0J1dHRvbi50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUM2QjtBQWF0QixNQUFNQyxTQUFnQztRQUFDLEVBQzVDQyxJQUFJLEVBQ0pDLE9BQU8sRUFDUEMsZUFBZSxFQUNmQyxZQUFZLE9BQU8sRUFDbkJDLElBQUksRUFDSkMsT0FBTyxLQUFLLEVBQ1pDLE9BQU8sRUFDUEMsU0FBUyxDQUFDLEVBQ1g7SUFDQyxNQUFNQyxvQkFBb0IsR0FFekIsT0FEQ04sb0JBQW9CLFNBQVMsdUJBQXVCO0lBRXRELHFCQUNFLDhEQUFDTztRQUNDQyxXQUFXLE1BQW9GRixPQUE5RU4saUJBQWdCLGdFQUFnRixPQUFsQk07O1lBRTlGUCx5QkFDQyw4REFBQ1U7Z0JBQ0NDLEtBQUtYO2dCQUNMWSxLQUFJO2dCQUNKSCxXQUFVOzs7Ozs7WUFHYkwscUJBQ0MsOERBQUNQLGlEQUFJQTtnQkFDSE0sTUFBTUEsUUFBUTtnQkFDZE0sV0FBVTswQkFFVFY7Ozs7OzBDQUdILDhEQUFDYztnQkFDQ1YsTUFBTUE7Z0JBQ05NLFdBQVcsa0NBQTRDLE9BQVZQLFdBQVU7Z0JBQ3ZERyxTQUFTLENBQUNTO29CQUNSLElBQUlULFNBQVM7d0JBQ1hTLEVBQUVDLGNBQWM7d0JBQ2hCVjtvQkFDRjtvQkFDQTtnQkFDRjswQkFFQ047Ozs7Ozs7Ozs7OztBQUtYLEVBQUU7S0FoRFdEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2NvbXBvbmVudHMvY29tbW9uL0J1dHRvbi50c3g/NjEzZiJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcbmltcG9ydCBMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcblxuaW50ZXJmYWNlIEJ1dHRvblByb3BzIHtcbiAgdGV4dDogc3RyaW5nO1xuICBsb2dvVXJsPzogc3RyaW5nO1xuICBiYWNrZ3JvdW5kQ29sb3I6IHN0cmluZztcbiAgZm9udENvbG9yPzogc3RyaW5nO1xuICBocmVmPzogc3RyaW5nO1xuICBsaW5rPzogYm9vbGVhbjtcbiAgb25DbGljaz86ICgpID0+IHZvaWQ7XG4gIG1hcmdpbj86IG51bWJlcjtcbn1cblxuZXhwb3J0IGNvbnN0IEJ1dHRvbjogUmVhY3QuRkM8QnV0dG9uUHJvcHM+ID0gKHtcbiAgdGV4dCxcbiAgbG9nb1VybCxcbiAgYmFja2dyb3VuZENvbG9yLFxuICBmb250Q29sb3IgPSBcIndoaXRlXCIsXG4gIGhyZWYsXG4gIGxpbmsgPSBmYWxzZSxcbiAgb25DbGljayxcbiAgbWFyZ2luID0gMCxcbn0pID0+IHtcbiAgY29uc3QgaG92ZXJCZ0NvbG9yQ2xhc3MgPSBgJHtcbiAgICBiYWNrZ3JvdW5kQ29sb3IgPT09IFwibWFpblwiID8gXCJob3ZlcjpiZy1tYWluU2hhZGVcIiA6IFwiaG92ZXI6Ymctc3ViU2hhZGVcIlxuICB9YDtcbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9e2BiZy0ke2JhY2tncm91bmRDb2xvcn0gIGlubGluZS1ibG9jayBjdXJzb3ItcG9pbnRlciB0ZXh0LWNlbnRlciByb3VuZGVkIHB4LTUgcHktMiAke2hvdmVyQmdDb2xvckNsYXNzfWB9XG4gICAgPlxuICAgICAge2xvZ29VcmwgJiYgKFxuICAgICAgICA8aW1nXG4gICAgICAgICAgc3JjPXtsb2dvVXJsfVxuICAgICAgICAgIGFsdD1cImxvZ29cIlxuICAgICAgICAgIGNsYXNzTmFtZT1cImlubGluZS1ibG9jayB3LTYgaC02IG1yLTIgYWxpZ24tbWlkZGxlXCJcbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgICB7bGluayA/IChcbiAgICAgICAgPExpbmtcbiAgICAgICAgICBocmVmPXtocmVmIHx8IFwiL0phbVBvcnRhbFwifVxuICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtd2hpdGUgbm8tdW5kZXJsaW5lIGZvbnQtcmVndWxhclwiXG4gICAgICAgID5cbiAgICAgICAgICB7dGV4dH1cbiAgICAgICAgPC9MaW5rPlxuICAgICAgKSA6IChcbiAgICAgICAgPGFcbiAgICAgICAgICBocmVmPXtocmVmfVxuICAgICAgICAgIGNsYXNzTmFtZT17YG5vLXVuZGVybGluZSBmb250LXJlZ3VsYXIgdGV4dC0ke2ZvbnRDb2xvcn0gYWxpZ24tbWlkZGxlYH1cbiAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKG9uQ2xpY2spIHtcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICBvbkNsaWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIHt0ZXh0fVxuICAgICAgICA8L2E+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLCJuYW1lcyI6WyJMaW5rIiwiQnV0dG9uIiwidGV4dCIsImxvZ29VcmwiLCJiYWNrZ3JvdW5kQ29sb3IiLCJmb250Q29sb3IiLCJocmVmIiwibGluayIsIm9uQ2xpY2siLCJtYXJnaW4iLCJob3ZlckJnQ29sb3JDbGFzcyIsImRpdiIsImNsYXNzTmFtZSIsImltZyIsInNyYyIsImFsdCIsImEiLCJlIiwicHJldmVudERlZmF1bHQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/common/Button.tsx\n"));

/***/ })

});