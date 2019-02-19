//index.js
//获取应用实例
const app = getApp()

var amapFile = require('../../utils/amap-wx.js'); //如：..­/..­/libs/amap-wx.js

Page({
  data: {
    cityName: '123',
    days: ['今天', '明天', '后天'],
    tq_list: [],
    location: '',
    title_name: '',
    title_temp: '',
    qlty: '',
    aqi: '',
    updateLoc: '',
    wind: '',
    weatherClassList: {
      '多云': 'iconfont icon-baitian-duoyun',
      '晴': 'iconfont icon-baitian-qing',
      '阴': 'iconfont icon-baitian-duoyun',
      '阵雨': 'iconfont icon-baitian-zhongyu',
      '小雨': 'iconfont icon-baitian-xiaoyu',
      '中雨': 'iconfont icon-baitian-zhongyu',
      '雷阵雨': 'iconfont icon-baitian-lei',
      '雨夹雪': 'iconfont icon-baitian-xiaoxue',
      '小雪': 'iconfont icon-baitian-xiaoxue',
    }

  },
  //事件处理函数

  // 下拉刷新
  onPullDownRefresh: function() {

    var that = this

    wx.showNavigationBarLoading() //在标题栏中显示加载

    //模拟加载

    setTimeout(function() {

      that.getWeatherData(that.data.cityName)

      wx.hideNavigationBarLoading() //完成停止加载

      wx.stopPullDownRefresh() //停止下拉刷新

    }, 1000);

  },

  // 获取天气数据--------------------------
  getWeatherData(cityName) {

    var that = this
    var url = "https://free-api.heweather.com/v5/weather"
    var params = {
      city: cityName,
      key: "894fc2a749104d679fa022c3e71afe83"
    }


    // 原先的ajax请求
    wx.request({
      url: url,
      data: params,
      success: function(data) {

        data = data['data']

        var weatherBanner = data['HeWeather5'][0]['now']
        var weatherList = data['HeWeather5'][0]['daily_forecast']


        // console.log(weatherBanner)

        that.setData({
          location: data['HeWeather5'][0]['basic']['city'],
          title_name: weatherBanner['cond']['txt'],
          title_temp: weatherBanner['tmp'] + '°C',
          qlty: data['HeWeather5'][0]['aqi']['city']['qlty'],
          aqi: '空气质量: ' + data['HeWeather5'][0]['aqi']['city']['aqi'],
          updateLoc: '更新于: ' + data['HeWeather5'][0]['basic']['update']['loc'],
          wind: weatherBanner['wind']['dir'] + ' ' + weatherBanner['wind']['sc'] + '级',
          tq_list: weatherList,
          cityName: data['HeWeather5'][0]['basic']['city']


        })


      },
      error: function() {
        alert('网太差了')
      }
    })
  },

  onLoad() {


    var that = this;
    var myAmapFun = new amapFile.AMapWX({
      key: '6bd385db0c32ac6678b53e85dff5386f'
    });
    myAmapFun.getRegeo({
      success: function(data) {
        //成功回调


        var cityName = data[0]['regeocodeData']['addressComponent']['district']
        console.log(cityName + '-----------')
        that.getWeatherData(cityName)
      },
      fail: function(info) {
        //失败回调
        console.log(info)
      }
    })







  }




})