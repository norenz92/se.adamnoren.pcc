module.exports = {
  async getDeviceData({ homey, query }) {
    // you can access query parameters like "/?foo=bar" through `query.foo`

    // you can access the App instance through homey.app
    const result = await homey.app.getDeviceData();
    console.log(result)

    // perform other logic like mapping result data

    return result;
  }
};