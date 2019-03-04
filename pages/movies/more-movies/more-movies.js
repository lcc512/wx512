// pages/movies/more-movies/more-movies.js

var util = require('../../../utils/util.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    navigateTitle: '',
    movies: [],
    startNum: 0,
    dataUrl: '',

  },

  // 跳转到电影详情，dataset后面全小写
  onMovieTap(event) {

    var movieId = event.currentTarget.dataset.movieid

    console.log(movieId)

    wx.navigateTo({
      url: '../movie-detail/movie-detail?movieId=' + movieId,
    })

  },


  onScrollLower() {

    this.getMovieListData(this.data.startNum, 7)
  },

  // 获取电影数据
  getMovieListData(start, count) {

    // 加载效果
    wx.showNavigationBarLoading()

    var that=this
    var urlTemp = this.data.dataUrl

    wx.request({
      url: urlTemp + '?start=' + start + '&count=' + count,
      header: {
        'content-type': 'application/xml'
      },
      success(data) {

        that.processMovieListData(data['data'])
      }

    })

  },

  // 处理获得的电影数据
  processMovieListData(data) {

    var movieList = this.data.movies

    for (var i = 0; i < data['subjects'].length; i++) {

      var tempTitle = data['subjects'][i]['title']

      // 电影名截短
      if (tempTitle.length >= 6) {
        tempTitle = tempTitle.substring(0, 5) + '...'
      }

      movieList.push({
        img: data['subjects'][i]['images']['small'],
        title: tempTitle,
        rating: data['subjects'][i]['rating']['average'],
        starsList: util.convertToStarsArray(data['subjects'][i]['rating']['stars']),
        movieId: data['subjects'][i]['id'],
      })

    }

  

    this.setData({
      movies: movieList,
      startNum: movieList.length
    })

    // 隐藏加载动画
    wx.hideNavigationBarLoading()

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var category = options.category

    this.setData({
      navigateTitle: category
    })

    var dataUrlTemp = ''

    switch (category) {
      case '正在热映':
        dataUrlTemp = app.globalData.g_doubanBase + '/v2/movie/in_theaters'
        break;
      case '即将上映':
        dataUrlTemp = app.globalData.g_doubanBase + '/v2/movie/coming_soon'
        break;
      case 'Top250':
        dataUrlTemp = app.globalData.g_doubanBase + '/v2/movie/top250'
        break;
    }

    this.setData({
      dataUrl: dataUrlTemp
    })

    this.getMovieListData(0, 7)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})