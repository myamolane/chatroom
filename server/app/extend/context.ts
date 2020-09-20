module.exports = {
  successRes(data) {
    this.body = {
      code: 0,
      msg: null,
      data,
    }
  }
}
