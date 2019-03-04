// pages/movies/movie-detail/movie-detail.js

var util = require('../../../utils/util.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {},
  },

  viewMoviePostImg(event) {

    var url = event.currentTarget.dataset.src

    // 小程序图片预览API
    wx.previewImage({
      // current: url,
      urls: [url]
    })



  },


  // 获取电影数据
  getMovieListData(url) {

    // 加载效果
    wx.showNavigationBarLoading()

    var that = this

    wx.request({
      url: url,
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

    // console.log(data)

    // 导演
    var director = {
      avatar: '',
      name: '',
      id: ''
    }

    if (data.directors[0] != null) {
      if (data.directors[0].avatars != null) {
        director.avatar = data.directors[0].avatars.large
      }
    }

    director.name = data.directors[0].name
    director.id = data.directors[0].id


    // 电影
    var movie = {
      movieImg: data.images ? data.images.large : '',
      country: data.countries[0],
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      generes: data.genres.join('、'),
      stars: util.convertToStarsArray(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: util.convertToCastString(data.casts),
      castsInfo: util.convertToCastInfos(data.casts),
      summary: data.summary
    }

    console.log(movie)

    this.setData({
      movie: movie
    })

    // 隐藏加载动画
    wx.hideNavigationBarLoading()

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var url = app.globalData.g_doubanBase + '/v2/movie/subject/' + options.movieId

    //  单页面测试
    // var url = 'https://douban.uieee.com/v2/movie/subject/1652592'

    this.getMovieListData(url)
    // console.log(url)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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