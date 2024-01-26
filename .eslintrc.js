module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    overrides: [
        {
            env: {
                node: true
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script"
            }
        }
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    },
    plugins: ["react", "react-hooks", "@typescript-eslint"],
    rules: {
        "indent": [0, 4],
        "semi": [2, "always"],
        "multiline-ternary": ["off"],
        quotes: ["error", "double", { allowTemplateLiterals: true }],
        "react/react-in-jsx-scope": "error",
        "react/jsx-filename-extension": ["error", { extensions: [".js", ".jsx", ".tsx"] }],
    }
};