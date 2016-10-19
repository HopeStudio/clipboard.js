module.exports = {
    "extends": ["standard", "eslint:recommended"],
    "parserOptions": {
        // "ecmaVersion": 6,
        "sourceType": "module"
    },
    "env": {
        "es6": true,
        "browser": true,
        "node": true,
        "mocha": true,
        "amd": true
    },
    "plugins": [
        "standard"
    ],
    "global": {
        "ENV": true
    },
    "rules": {
        "semi": [2, "always"],
        "indent": [2, 4],
        "quotes": [2, "single"],
        "linebreak-style": [2, "unix"]
    }
};
