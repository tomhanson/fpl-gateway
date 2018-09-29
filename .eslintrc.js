// module.exports = {
//     "extends": "airbnb-base"
// };

module.exports = {
    "env": {
        es6: true,
        node: true,
        browser: true,
        jest: true
    },
    "extends": ["airbnb-base", "prettier"],
    "plugins": [
        "prettier"
        "graphql"
    ],
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "prettier/prettier": [

            "warn",
            {
                "printWidth": 100,
                "singleQuote": true,
                "trailingComma": "es5",
                "bracketSpacing": true,
                "jsxBracketSameLine": false,
                "parser": "babylon",
                "semi": true
            }
        ],
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};

// module.exports = {
//     "parser": "babel-eslint",
//     "extends": [
//         "airbnb",
//         "prettier",
//         "prettier/react"
//     ],
//     "plugins": [
//         "prettier"
// "graphql",
//         "flowtype"
//     ],
//     "rules": {
//         "react/react-in-jsx-scope": "off",
//         "react/prefer-stateless-function": [2, { "ignorePureComponents": true }],
//         "prettier/prettier": [

//             "warn",
//             {
//                 "printWidth": 100,
//                 "singleQuote": true,
//                 "trailingComma": "es5",
//                 "bracketSpacing": true,
//                 "jsxBracketSameLine": false,
//                 "parser": "babylon",
//                 "semi": true
//             }
//         ],
//         "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
//         "jsx-a11y/anchor-is-valid": [0, {
//             "components": ["Link"],
//             "specialLink": ["hrefLeft", "hrefRight"],
//             "aspects": ["noHref", "invalidHref", "preferButton"]
//         }]
//     }
// };