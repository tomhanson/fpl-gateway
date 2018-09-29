// module.exports = {
//     "extends": "airbnb-base"
// };

module.exports = {
    "env": {
        "es6": true,
        "commonjs": true,
        "node": true,
        "browser": true,
        "jest": true
    },
    "extends": ["airbnb", "prettier"],
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
                // "jsxBracketSameLine": false,
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