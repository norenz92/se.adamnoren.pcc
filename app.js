'use strict';

const Homey = require('homey');
const { HomeyAPI } = require('athom-api');

class MyApp extends Homey.App {

  /**
   * onInit is called when the app is initialized.
   */
  async onInit() {
    this.log('MyApp has been initialized');
    this.homey.api = await HomeyAPI.forCurrentHomey(this.homey);
    await this.runCheck();
    this.everyHour();
  }

  everyHour() {
		const now = new Date();
		const nextHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 0, 59, 50, 0);
		const timeToNextHour = nextHour - now;
		// console.log('everyHour starts in', timeToNextHour / 1000);
		this.homey.setTimeout(() => {
			this.homey.setInterval(() => {
				//this.homey.emit('everyhour', true);
        this.runCheck()
			}, 60 * 60 * 1000);
			//this.homey.emit('everyhour', true);
      this.runCheck()
		}, timeToNextHour);
		this.log('everyHour job started');
	}

  async getDeviceData() {
    return await this.homey.settings.get('data')
  }

  async runCheck() {
    try {
      // Get all devices
      const devices = await this.homey.api.devices.getDevices();;

      let measurableDevices = await this.homey.settings.get('data')

      if (measurableDevices === null) measurableDevices = {}

      console.log(measurableDevices)


      // Loop over all devices
      for (const device of Object.values(devices)) {
        //console.log(device)

        let currentDate = new Date();
        currentDate.setMinutes(0,0,0);
        let prevDate = new Date(currentDate)
        prevDate.setHours(currentDate.getHours()-1)

        if (device.capabilities.indexOf('meter_power') > -1) {

          let tibberData = getTibberData();

          let deviceData = {
            id: device.id,
            name: device.name,
            zoneName: device.zoneName,
            currentMeter: device.capabilitiesObj.meter_power.value
          }

          
          let kwhSinceLastHour = ((measurableDevices[device.id]) && (measurableDevices[device.id].data[prevDate] !== null)) ? deviceData.currentMeter-measurableDevices[device.id].data[prevDate].meter : 0

          if (measurableDevices[device.id]) {
            measurableDevices[device.id].data = {
              ...measurableDevices[device.id].data,
              [currentDate] : {
                meter: deviceData.currentMeter,
                kwh: kwhSinceLastHour,
                cost: kwhSinceLastHour*tibberData.price,
                kwhPrice: tibberData.price
              }
            }
            measurableDevices[device.id].deviceInfo = deviceData
          } else {
            measurableDevices[device.id] = {
              deviceInfo: deviceData,
              data: {
                [currentDate]: {
                  meter: deviceData.currentMeter,
                  kwh: kwhSinceLastHour,
                  cost: kwhSinceLastHour*tibberData.price,
                  kwhPrice: tibberData.price
                }
              }
            }
          }
        }
      }

      await this.homey.settings.set('data', measurableDevices)

      function getTibberData() {
        let data = {
          lastUpdated: null,
          price: null
        }
        for (const device of Object.values(devices)) {
          //console.log(device)

          if (device.driverUri.includes('tibber')) {
            data.price = device.capabilitiesObj.price_total.value;
            data.lastUpdated = device.capabilitiesObj.price_total.lastUpdated;
          } 
        }
        return data;
      }
    } catch (err) {
      this.log(err)
    }
  }
}

module.exports = MyApp;
