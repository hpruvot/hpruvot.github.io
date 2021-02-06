/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/*!********************************!*\
  !*** ./src/assets/js/index.js ***!
  \********************************/
eval("document.querySelectorAll('.zone__item').forEach(function (item) {\n  item.addEventListener('click', function () {\n    var index = item.getAttribute('data-zone');\n    console.log(index);\n    document.querySelector('[data-popup=\"' + index + '\"]').classList.add('-isShowed');\n  });\n});\ndocument.querySelectorAll('.popup__back').forEach(function (item) {\n  item.addEventListener('click', function () {\n    document.querySelector('.-isShowed').classList.remove('-isShowed');\n  });\n});\n\n//# sourceURL=webpack://vire-normandie/./src/assets/js/index.js?");
/******/ })()
;