module.exports = {
  async getDeviceData({ homey, query }) {
    return await homey.app.getDeviceData();
  }
};