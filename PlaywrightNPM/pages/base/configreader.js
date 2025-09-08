const fs = require("fs");
const path = require("path");

class ConfigReader {
  static getConfig() {
    const filePath = path.join(__dirname, "../base/config.json");
    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData);
  }

  static getDoUsername() {
    return this.getConfig().DOusername;
  }

  static getDoPassword() {
    return this.getConfig().DOpassword;
  }

  static getPaUsername() {
    return this.getConfig().PAusername;
  }

  static getPaPassword() {
    return this.getConfig().PApassword;
  }

  static getBaseURL() {
    return this.getConfig().baseURL;
  }
}

module.exports = ConfigReader;
