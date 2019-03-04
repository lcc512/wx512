// pages/movies/movies.js

var util = require('../../utils/util.js')

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    inTheaters: {},
    comingSoon: {},
    top250: {},
    containerShow: true,
    searchPanelShow: false,
    searchData: {},
    inputValue: ''

  },


  // 搜索框代码
  onBindfocus(event) {

    var searchUrl = app.globalData.g_doubanBase + '/v2/movie/search?q=' + event.detail.value

    console.log(searchUrl)

    this.getMovieListData(searchUrl, 'searchData', 'searchData')

    this.setData({
      containerShow: false,
      searchPanelShow: true
    })

  },

  // 取消搜索
  onCancelSearch() {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      inputValue: ''
    })
  },

  // 更多跳转
  toMorePage(event) {

    var category = event.currentTarget.dataset.category

    // 测试分类（为了不用调用网络）
    // var category = 'Top250'

    wx.navigateTo({
      url: '/pages/movies/more-movies/more-movies?category=' + category,
    })
  },

  // 跳转到电影详情，dataset后面全小写
  onMovieTap(event) {

    var movieId = event.currentTarget.dataset.movieid

    console.log(movieId)

    wx.navigateTo({
      url: './movie-detail/movie-detail?movieId=' + movieId,
    })

  },


  // 获取电影数据
  getMovieListData(url, movieListKey, movieListTitle) {

    // 加载效果
    wx.showNavigationBarLoading()

    var that = this

    wx.request({
      url: url,
      header: {
        'content-type': 'application/xml'
      },
      success(data) {
        // console.log(res)
        that.processMovieListData(data['data'], movieListKey, movieListTitle)
      }

    })

  },
  // 处理获得的电影数据
  processMovieListData(data, movieListKey, movieListTitle) {

    if (data['total'] === 0) {
      wx.showToast({
        title: '没有数据',
        icon: 'clear'
      })

      // 结束加载动画
      wx.hideNavigationBarLoading()

      return
    }

    var movieList = []

    var tempTitle = ''

    // 解决豆瓣count和total不一致的问题
    var tempNum = data.count > data.total ? data.total : data.count

    // console.log(data)

    for (var i = 0; i < tempNum; i++) {

      var tempTitle = data['subjects'][i]['title']


      // 电影名截短
      if (tempTitle.length >= 6) {
        tempTitle = tempTitle.substring(0, 5) + '...'
      }

      movieList[i] = {
        img: data['subjects'][i]['images']['small'],
        title: tempTitle,
        rating: data['subjects'][i]['rating']['average'],
        starsList: util.convertToStarsArray(data['subjects'][i]['rating']['stars']),
        movieId: data['subjects'][i]['id'],
      }

    }

    var tempDataName = {}
    tempDataName[movieListKey] = {
      movies: movieList,
      movieListTitle: movieListTitle
    }

    // 不管何种类型，top250还是search，最终到data那里
    this.setData(tempDataName)


    // 结束加载动画
    wx.hideNavigationBarLoading()


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // 网上找的豆瓣暂时能用的api
    var inTheatersUrl = app.globalData.g_doubanBase + '/v2/movie/in_theaters?start=0&count=3'
    var comingSoonUrl = app.globalData.g_doubanBase + '/v2/movie/coming_soon?start=0&count=3'
    var top250Url = app.globalData.g_doubanBase + '/v2/movie/top250?start=0&count=3'


    this.getMovieListData(inTheatersUrl, 'inTheaters', '正在热映')
    this.getMovieListData(comingSoonUrl, 'comingSoon', '即将上映')
    this.getMovieListData(top250Url, 'top250', 'Top250')

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