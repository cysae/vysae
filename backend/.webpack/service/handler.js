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

eval("/*** IMPORTS FROM imports-loader ***/\nvar graphql = __webpack_require__(/*! graphql */ \"graphql\");\n\n'use strict';\n\nvar _apolloServerLambda = __webpack_require__(/*! apollo-server-lambda */ \"apollo-server-lambda\");\n\nvar _graphqlTools = __webpack_require__(/*! graphql-tools */ \"graphql-tools\");\n\nvar _schema = __webpack_require__(/*! ./schema */ \"./schema.js\");\n\nvar _resolvers = __webpack_require__(/*! ./resolvers */ \"./resolvers.js\");\n\nconst myGraphQLSchema = (0, _graphqlTools.makeExecutableSchema)({\n    typeDefs: _schema.typeDefs,\n    resolvers: _resolvers.resolvers,\n    logger: console\n});\n\nexports.graphqlHandler = function graphqlHandler(event, context, callback) {\n    function callbackWithHeaders(error, output) {\n        // eslint-disable-next-line no-param-reassign\n        output.headers['Access-Control-Allow-Origin'] = '*';\n        callback(error, output);\n    }\n\n    const handler = (0, _apolloServerLambda.graphqlLambda)({ schema: myGraphQLSchema });\n    return handler(event, context, callbackWithHeaders);\n};\n\nexports.graphiqlHandler = (0, _apolloServerLambda.graphiqlLambda)({\n    endpointURL: process.env.REACT_APP_GRAPHQL_ENDPOINT ? process.env.REACT_APP_GRAPHQL_ENDPOINT : '/production/graphql'\n});\n\nmodule.exports.hello = (event, context, callback) => {\n    const response = {\n        statusCode: 200,\n        body: JSON.stringify({\n            message: 'Go Serverless v1.0! Your function executed successfully!',\n            input: event\n        })\n    };\n\n    callback(null, response);\n\n    // Use this code if you don't use the http event with the LAMBDA-PROXY integration\n    // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });\n};\n\n\n//# sourceURL=webpack:///./handler.js?");

/***/ }),

/***/ "./resolvers.js":
/*!**********************!*\
  !*** ./resolvers.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*** IMPORTS FROM imports-loader ***/\nvar graphql = __webpack_require__(/*! graphql */ \"graphql\");\n\n'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.resolvers = undefined;\n\nvar _serverlessDynamodbClient = __webpack_require__(/*! serverless-dynamodb-client */ \"serverless-dynamodb-client\");\n\nvar _serverlessDynamodbClient2 = _interopRequireDefault(_serverlessDynamodbClient);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar AWS = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n\n\nlet docClient;\nconsole.log(\"development\");\nif (false) {} else {\n    docClient = _serverlessDynamodbClient2.default.doc;\n}\n\nconst promisify = foo => new Promise((resolve, reject) => {\n    foo((error, result) => {\n        if (error) {\n            reject(error);\n        } else {\n            if (result.Items.length > 0) {\n                resolve({ name: result.Items[0].name });\n            } else {\n                resolve(null);\n            }\n        }\n    });\n});\n\nconst resolvers = exports.resolvers = {\n    Query: { getCompany: (root, args) => getCompany(args) }\n};\n\nfunction getCompany(args) {\n    return promisify(callback => docClient.query({\n        TableName: 'vysae',\n        KeyConditionExpression: '#name = :v1',\n        ExpressionAttributeNames: {\n            \"#name\": \"name\"\n        },\n        ExpressionAttributeValues: {\n            ':v1': args.name\n        }\n    }, callback));\n}\n\n\n//# sourceURL=webpack:///./resolvers.js?");

/***/ }),

/***/ "./schema.js":
/*!*******************!*\
  !*** ./schema.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*** IMPORTS FROM imports-loader ***/\nvar graphql = __webpack_require__(/*! graphql */ \"graphql\");\n\n\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nconst typeDefs = exports.typeDefs = `\n  type Query { getCompany(name: String!): Company }\n  type Company { name: String! }\n  type Shareholder { id: String! }\n`;\n\n\n//# sourceURL=webpack:///./schema.js?");

/***/ }),

/***/ "apollo-server-lambda":
/*!***************************************!*\
  !*** external "apollo-server-lambda" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"apollo-server-lambda\");\n\n//# sourceURL=webpack:///external_%22apollo-server-lambda%22?");

/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"aws-sdk\");\n\n//# sourceURL=webpack:///external_%22aws-sdk%22?");

/***/ }),

/***/ "graphql":
/*!**************************!*\
  !*** external "graphql" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"graphql\");\n\n//# sourceURL=webpack:///external_%22graphql%22?");

/***/ }),

/***/ "graphql-tools":
/*!********************************!*\
  !*** external "graphql-tools" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"graphql-tools\");\n\n//# sourceURL=webpack:///external_%22graphql-tools%22?");

/***/ }),

/***/ "serverless-dynamodb-client":
/*!*********************************************!*\
  !*** external "serverless-dynamodb-client" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"serverless-dynamodb-client\");\n\n//# sourceURL=webpack:///external_%22serverless-dynamodb-client%22?");

/***/ })

/******/ })));