function tableCreate(deviceData) {

  document.getElementById('data').innerHTML = ''

  let table = document.createElement('table');
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');

  table.appendChild(thead);
  table.appendChild(tbody);

  let row_1 = document.createElement('tr');
  let heading_1 = document.createElement('th');
  heading_1.innerHTML = "Device";
  let heading_2 = document.createElement('th');
  heading_2.innerHTML = "Prev. hour";
  let heading_3 = document.createElement('th');
  heading_3.innerHTML = "Today";
  let heading_4 = document.createElement('th');
  heading_4.innerHTML = "This week";
  let heading_5 = document.createElement('th');
  heading_5.innerHTML = "This month";
  let heading_6 = document.createElement('th');
  heading_6.innerHTML = "This year";
  let heading_7 = document.createElement('th');
  heading_7.innerHTML = "Lifetime";

  row_1.appendChild(heading_1);
  row_1.appendChild(heading_2);
  row_1.appendChild(heading_3);
  row_1.appendChild(heading_4);
  row_1.appendChild(heading_5);
  row_1.appendChild(heading_6);
  row_1.appendChild(heading_7);
  thead.appendChild(row_1);

  let totalData = {
    hour: {
      cost: 0,
      kwh: 0
    },
    today: {
      cost: 0,
      kwh: 0
    },
    week: {
      cost: 0,
      kwh: 0
    },
    month: {
      cost: 0,
      kwh: 0
    },
    year: {
      cost: 0,
      kwh: 0
    },
    lifetime: {
      cost: 0,
      kwh: 0
    },
  }

  Object.keys(deviceData).forEach(key => {

    let row = document.createElement('tr');
    let row_data_1 = document.createElement('td');
    row_data_1.innerHTML = `${deviceData[key].deviceInfo.name}`;
    let row_data_2 = document.createElement('td');
    row_data_2.innerHTML = `${(hourData(deviceData[key].data).cost).toFixed(2)}:- (${(hourData(deviceData[key].data).kwh).toFixed(2)} kWh)`;
    totalData.hour.cost += hourData(deviceData[key].data).cost
    totalData.hour.kwh += hourData(deviceData[key].data).kwh

    let row_data_3 = document.createElement('td');
    row_data_3.innerHTML = `${(todayData(deviceData[key].data).cost).toFixed(2)}:- (${(todayData(deviceData[key].data).kwh).toFixed(2)} kWh)`;
    totalData.today.cost += todayData(deviceData[key].data).cost
    totalData.today.kwh += todayData(deviceData[key].data).kwh

    let row_data_4 = document.createElement('td');
    row_data_4.innerHTML = `${(weekData(deviceData[key].data).cost).toFixed(2)}:- (${(weekData(deviceData[key].data).kwh).toFixed(2)} kWh)`;
    totalData.week.cost += weekData(deviceData[key].data).cost
    totalData.week.kwh += weekData(deviceData[key].data).kwh

    let row_data_5 = document.createElement('td');
    row_data_5.innerHTML = `${(monthData(deviceData[key].data).cost).toFixed(2)}:- (${(monthData(deviceData[key].data).kwh).toFixed(2)} kWh)`;
    totalData.month.cost += monthData(deviceData[key].data).cost
    totalData.month.kwh += monthData(deviceData[key].data).kwh

    let row_data_6 = document.createElement('td');
    row_data_6.innerHTML = `${(yearData(deviceData[key].data).cost).toFixed(2)}:- (${(yearData(deviceData[key].data).kwh).toFixed(2)} kWh)`;
    totalData.year.cost += yearData(deviceData[key].data).cost
    totalData.year.kwh += yearData(deviceData[key].data).kwh

    let row_data_7 = document.createElement('td');
    row_data_7.innerHTML = `${(lifetimeData(deviceData[key].data).cost).toFixed(2)}:- (${(lifetimeData(deviceData[key].data).kwh).toFixed(2)} kWh)`;
    totalData.lifetime.cost += lifetimeData(deviceData[key].data).cost
    totalData.lifetime.kwh += lifetimeData(deviceData[key].data).kwh

    row.appendChild(row_data_1);
    row.appendChild(row_data_2);
    row.appendChild(row_data_3);
    row.appendChild(row_data_4);
    row.appendChild(row_data_5);
    row.appendChild(row_data_6);
    row.appendChild(row_data_7);
    tbody.appendChild(row);
  })

  let sumRow = document.createElement('tr');
  let sumRow_data_1 = document.createElement('td');
  let sumRow_data_2 = document.createElement('td');
  let sumRow_data_3 = document.createElement('td');
  let sumRow_data_4 = document.createElement('td');
  let sumRow_data_5 = document.createElement('td');
  let sumRow_data_6 = document.createElement('td');
  let sumRow_data_7 = document.createElement('td');
  sumRow_data_1.innerHTML = `Totals`;
  sumRow_data_2.innerHTML = `${(totalData.hour.cost).toFixed(2)}:- (${(totalData.hour.kwh).toFixed(2)} kWh)`;
  sumRow_data_3.innerHTML = `${(totalData.today.cost).toFixed(2)}:- (${(totalData.today.kwh).toFixed(2)} kWh)`;
  sumRow_data_4.innerHTML = `${(totalData.week.cost).toFixed(2)}:- (${(totalData.week.kwh).toFixed(2)} kWh)`;
  sumRow_data_5.innerHTML = `${(totalData.month.cost).toFixed(2)}:- (${(totalData.month.kwh).toFixed(2)} kWh)`;
  sumRow_data_6.innerHTML = `${(totalData.year.cost).toFixed(2)}:- (${(totalData.year.kwh).toFixed(2)} kWh)`;
  sumRow_data_7.innerHTML = `${(totalData.lifetime.cost).toFixed(2)}:- (${(totalData.lifetime.kwh).toFixed(2)} kWh)`;
  sumRow.appendChild(sumRow_data_1);
  sumRow.appendChild(sumRow_data_2);
  sumRow.appendChild(sumRow_data_3);
  sumRow.appendChild(sumRow_data_4);
  sumRow.appendChild(sumRow_data_5);
  sumRow.appendChild(sumRow_data_6);
  sumRow.appendChild(sumRow_data_7);
  tbody.appendChild(sumRow);

  // Adding the entire table to the body tag
  document.getElementById('data').innerHTML = ''
  document.getElementById('data').appendChild(table);
}

function lifetimeData(deviceData) {

  var results = Object.keys(deviceData).reduce(function(acc, val) {
    acc[val] = deviceData[val];
    return acc;
  }, {});

  return {
    cost: Number(Object.keys(results).reduce(function (previous, key) {
      return Number(previous + results[key].cost);
    }, 0)),
    kwh: Number(Object.keys(results).reduce(function (previous, key) {
      return Number(previous + results[key].kwh);
    }, 0))
  }
}

function yearData(deviceData) {

  let currentYear = new Date().getFullYear();

  var results = Object.keys(deviceData).reduce(function(acc, val) {
    if(new Date(val).getFullYear() === currentYear)  acc[val] = deviceData[val];
    return acc;
  }, {});

  return {
    cost: Number(Object.keys(results).reduce(function (previous, key) {
      return Number(previous + results[key].cost);
    }, 0)),
    kwh: Number(Object.keys(results).reduce(function (previous, key) {
      return Number(previous + results[key].kwh);
    }, 0))
  }
}

function monthData(deviceData) {

  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth();

  var results = Object.keys(deviceData).reduce(function(acc, val) {
    if ((new Date(val).getFullYear() === currentYear) && (new Date(val).getMonth() === currentMonth))  acc[val] = deviceData[val];
    return acc;
  }, {});

  return {
    cost: Number(Object.keys(results).reduce(function (previous, key) {
      return Number(previous + results[key].cost);
    }, 0)),
    kwh: Number(Object.keys(results).reduce(function (previous, key) {
      return Number(previous + results[key].kwh);
    }, 0))
  }
}

function weekData(deviceData) {

  currentdate1 = new Date();
  var oneJan1 = new Date(currentdate1.getFullYear(),0,1);
  var numberOfDays1 = Math.floor((currentdate1 - oneJan1) / (24 * 60 * 60 * 1000));
  var result1 = Math.ceil(( currentdate1.getDay() + 1 + numberOfDays1) / 7);

  var results = Object.keys(deviceData).reduce(function(acc, val) {
    currentdate2 = new Date(val);
    var oneJan2 = new Date(currentdate2.getFullYear(),0,1);
    var numberOfDays2 = Math.floor((currentdate2 - oneJan2) / (24 * 60 * 60 * 1000));
    var result2 = Math.ceil(( currentdate2.getDay() + 1 + numberOfDays2) / 7);
    if (result1 === result2)  acc[val] = deviceData[val];
    return acc;
  }, {});

  return {
    cost: Number(Object.keys(results).reduce(function (previous, key) {
      return Number(previous + results[key].cost);
    }, 0)),
    kwh: Number(Object.keys(results).reduce(function (previous, key) {
      return Number(previous + results[key].kwh);
    }, 0))
  }
}

function todayData(deviceData) {

  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth();
  let currentDate = new Date().getDate();

  var results = Object.keys(deviceData).reduce(function(acc, val) {
    if ((new Date(val).getFullYear() === currentYear) && (new Date(val).getMonth() === currentMonth) && (new Date(val).getDate() === currentDate))  acc[val] = deviceData[val];
    return acc;
  }, {});

  return {
    cost: Number(Object.keys(results).reduce(function (previous, key) {
      return Number(previous + results[key].cost);
    }, 0)),
    kwh: Number(Object.keys(results).reduce(function (previous, key) {
      return Number(previous + results[key].kwh);
    }, 0))
  }
}

function hourData(deviceData) {

  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth();
  let currentDate = new Date().getDate();
  let currentHour = new Date().getHours();

  var results = Object.keys(deviceData).reduce(function(acc, val) {
    if ((new Date(val).getFullYear() === currentYear) && (new Date(val).getMonth() === currentMonth) && (new Date(val).getDate() === currentDate) && (new Date(val).getHours() === currentHour-1))  acc[val] = deviceData[val];
    return acc;
  }, {});

  return {
    cost: Number(Object.keys(results).reduce(function (previous, key) {
      return Number(previous + results[key].cost);
    }, 0)),
    kwh: Number(Object.keys(results).reduce(function (previous, key) {
      return Number(previous + results[key].kwh);
    }, 0))
  }
}