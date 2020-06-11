module.exports = {
    "parserOptions":{
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "rules": {
        "indent": ["error", 4],
        "semi": ["error", "never"],
        "quotes": [2, "double"]
    },
    "globals": {
        "browser": true
    },
    "env": {
        "mocha": true
    }
}