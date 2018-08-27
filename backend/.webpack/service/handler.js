(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./handler.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./handler.js":
/*!********************!*\
  !*** ./handler.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*** IMPORTS FROM imports-loader ***/\nvar graphql = __webpack_require__(/*! graphql */ \"graphql\");\n\n'use strict';\n\nvar _docxpresso = __webpack_require__(/*! docxpresso */ \"docxpresso\");\n\nvar _docxpresso2 = _interopRequireDefault(_docxpresso);\n\nvar _awsAmplify = __webpack_require__(/*! aws-amplify */ \"aws-amplify\");\n\nvar _awsAmplify2 = _interopRequireDefault(_awsAmplify);\n\nvar _generatePassword = __webpack_require__(/*! generate-password */ \"generate-password\");\n\nvar _generatePassword2 = _interopRequireDefault(_generatePassword);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\n_awsAmplify2.default.configure({\n  Auth: {\n    identityPoolId: 'eu-west-1:5e331c35-306a-4885-9044-383af2ad1067',\n    region: 'eu-west-1',\n    userPoolId: 'eu-west-1_MUEHMQ2R2',\n    userPoolWebClientId: '675m7ktuif5or2ci1nq9tg1nu9'\n  }\n});\n\nmodule.exports.meetingDocx = (event, context, callback) => {\n  const url = _docxpresso2.default.previewDocument(115, 'http://localhost:3000/', 'https://5fmz4wdy17.execute-api.eu-west-1.amazonaws.com/dev/meeting/convene');\n\n  callback(null, { url });\n};\n\nmodule.exports.conveneMeeting = (event, context, callback) => {\n  console.log(event);\n  const response = {\n    statusCode: 200,\n    body: JSON.stringify({\n      message: 'Go Serverless v1.0! Your function executed successfully!',\n      input: event\n    })\n  };\n\n  callback(null, response);\n};\n\n// create user\nmodule.exports.createUser = (() => {\n  var _ref = _asyncToGenerator(function* (event, context, callback) {\n    const { username, email, phone_number } = event.arguments;\n    const { userSub } = yield _awsAmplify.Auth.signUp({\n      username: username,\n      password: _generatePassword2.default.generate({ length: 8, numbers: true, symbols: true, strict: true }),\n      attributes: {\n        email: email,\n        phone_number: phone_number\n      }\n    });\n    callback(null, {\n      userId: userSub,\n      username,\n      email,\n      phone_number\n    });\n  });\n\n  return function (_x, _x2, _x3) {\n    return _ref.apply(this, arguments);\n  };\n})();\n\n\n//# sourceURL=webpack:///./handler.js?");

/***/ }),

/***/ "aws-amplify":
/*!******************************!*\
  !*** external "aws-amplify" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"aws-amplify\");\n\n//# sourceURL=webpack:///external_%22aws-amplify%22?");

/***/ }),

/***/ "docxpresso":
/*!*****************************!*\
  !*** external "docxpresso" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"docxpresso\");\n\n//# sourceURL=webpack:///external_%22docxpresso%22?");

/***/ }),

/***/ "generate-password":
/*!************************************!*\
  !*** external "generate-password" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"generate-password\");\n\n//# sourceURL=webpack:///external_%22generate-password%22?");

/***/ }),

/***/ "graphql":
/*!**************************!*\
  !*** external "graphql" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"graphql\");\n\n//# sourceURL=webpack:///external_%22graphql%22?");

/***/ })

/******/ })));