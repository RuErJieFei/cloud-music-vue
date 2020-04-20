module.exports = function(ctx) {
  console.log(ctx)
  return {
    framework: {
      plugins: ['Notify'],
      config: {
        notify: {
          /* Notify defaults */
        }
      }
    }
    // 输出到控制台的例子:

    // 根据这些参数上下文将会被创建
    // 当你运行"quasar dev"或"quasar build"时
  }
}
