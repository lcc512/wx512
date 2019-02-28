// pages/movies/movies.js


var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    inTheaters: {},
    comingSoon: {},
    top250: {}

  },

  // 更多跳转
  toMorePage(event) {

    var category=event.currentTarget.dataset.category
    
    // 测试分类（为了不用调用网络）
    var category = '正在热映'

    wx.navigateTo({
      url: '/pages/movies/more-movies/more-movies?category=' + category,
    })
  },

  // 获取电影数据
  getMovieListData(url, movieListKey, movieListTitle) {

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

    var movieList = []

    var tempTitle

    for (var i = 0; i < data['count']; i++) {

      var tempTitle = data['subjects'][i]['title']
      var tempStars = data['subjects'][i]['rating']['stars']
      var tempStarsList=[0,0,0,0,0]

      // 电影名截短
      if (tempTitle.length >= 6) {
        tempTitle = tempTitle.substring(0, 5) + '...'
      }

      // 星级，一个5个元素的数组，点亮星置为1
      for(var j=0; j<tempStars/10;j++){
        tempStarsList[j]=1
      }

      movieList[i] = {
        img: data['subjects'][i]['images']['small'],
        title: tempTitle,
        rating: data['subjects'][i]['rating']['average'],
        starsList: tempStarsList,
        movieId: data['subjects'][i]['id'],
      }

    }

    // console.log(movieList[0].starsList)

    var tempDataName = {}
    tempDataName[movieListKey] = {
      movies: movieList,
      movieListTitle: movieListTitle
    }

    this.setData(tempDataName)


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // 网上找的豆瓣暂时能用的api
    var inTheatersUrl = app.globalData.g_doubanBase + '/v2/movie/in_theaters?start=0&count=3'
    var comingSoonUrl = app.globalData.g_doubanBase + '/v2/movie/coming_soon?start=0&count=3'
    var top250Url = app.globalData.g_doubanBase + '/v2/movie/top250?start=0&count=3'


    // this.getMovieListData(inTheatersUrl, 'inTheaters', '正在热映')
    // this.getMovieListData(comingSoonUrl, 'comingSoon', '即将上映')
    // this.getMovieListData(top250Url, 'top250', 'Top250')

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