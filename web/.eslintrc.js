module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
    "react-hooks/exhaustive-deps": "warn", // 检查 effect 的依赖
    "import/no-extraneous-dependencies": "off",
    "react/no-unused-prop-types": "warn"
  }
}
