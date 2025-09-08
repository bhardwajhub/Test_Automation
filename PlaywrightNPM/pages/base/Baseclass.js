class Base {
  constructor(page) {
    this.page = page;
    this.env = process.env.ENV || "qa"; // default env = qa
  }

  async goto(url) {
    await this.page.goto(url);
  }

}

module.exports = Base;