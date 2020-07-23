module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true,
        "jest": true
    },
    "extends": "eslint:recommended",
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "warn", 4,
            { "SwitchCase": 1 }
        ],
        "semi": [
            "warn",
            "always"
        ],
        "no-empty": "warn",
        "no-irregular-whitespace": [
            "warn",
            {
                "skipStrings": true,
                "skipComments": true,
                "skipTemplates": true,
                "skipRegExps": true
            }
        ],
        "no-debugger": 0,
        "no-async-promise-executor": 0,
        "require-atomic-updates": 0,
        "no-undef": "error",
        "space-infix-ops": [
            1, { "int32Hint": false }
        ],
        "object-curly-spacing": ["warn", "always"],
        "no-console": "off",
        "no-unexpected-multiline": "warn",
        "no-unreachable": "error",
        "curly": "warn",
        "no-empty-function": "off",
        "no-eq-null": "warn",
        "no-eval": "warn",
        "no-lone-blocks": "warn",
        "no-loop-func": "warn",
        "no-multi-spaces": "warn",
        "no-self-assign": "error",
        "no-useless-return": "warn",
        "array-bracket-spacing": [
            "warn", "never"
        ],
        "brace-style": "warn",
        "comma-dangle": [
            "warn", "never"
        ],
        "comma-style": [
            "warn", "last"
        ],
        "func-call-spacing": [
            "warn", "never"
        ],
        "key-spacing": [
            "warn", { "afterColon": true }
        ],
        "keyword-spacing": [
            "warn", { "before": true }
        ],
        "max-depth": [
            "warn", 4
        ],
        "max-len": [
            "warn", { "code": 280 }
        ],
        "max-statements-per-line": [
            "warn", { "max": 2 }
        ],
        "no-mixed-spaces-and-tabs": 0,
        "no-multi-assign": "error",
        "no-multiple-empty-lines": [
            "warn", {
                "max": 1, "maxEOF": 1, "maxBOF": 1
            }
        ],
        
        "no-constant-condition": "warn",
        "no-unused-vars": 0,
        // "max-params": [
        //     "warn", 6
        // ],
        // "no-trailing-spaces": "warn",
        // "no-use-before-define": "warn",
        // "linebreak-style": [
        //     "warn",
        //     "unix"
        // ],
        // "quotes": [
        //     "warn",
        //     "single",
        // ],
        "no-whitespace-before-property": "warn",
        "space-before-blocks": "warn",
        "space-before-function-paren":  ["warn", {
            "anonymous": "never",
            "named": "never",
            "asyncArrow": "always"
        }],
        "space-in-parens": [
            "warn", "never"
        ],
        "space-unary-ops": "warn",
        "switch-colon-spacing": "warn",
        "template-tag-spacing": [
            "warn", "always"
        ],
        "id-length": [
            "warn", { "min": 2, "max": 40}
        ],
        "no-inner-declarations": 0,
        "no-case-declarations": 0,
        "arrow-spacing": "warn",
        "no-const-assign": "error",
        "no-dupe-class-members": "error",
        "no-duplicate-imports": "error",
        "no-useless-rename": "error",
        "no-var": "warn",
        "prefer-const": "warn",
        "no-extra-boolean-cast": "off",
        "no-extra-semi": "warn"
    }
};