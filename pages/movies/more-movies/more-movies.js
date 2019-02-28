// pages/movies/more-movies/more-movies.js

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    navigateTitle: '',
    moreMovieData:''

  },


  // 获取电影数据
  getMovieListData(url) {

    var that = this

    wx.request({
      url: url,
      header: {
        'content-type': 'application/xml'
      },
      success(data) {
        // console.log(res)
        that.processMovieListData(data['data'])
      }

    })

  },

  // 处理获得的电影数据
  processMovieListData(data) {

    var movieList = []

    var tempTitle

    for (var i = 0; i < data['count']; i++) {

      var tempTitle = data['subjects'][i]['title']
      var tempStars = data['subjects'][i]['rating']['stars']
      var tempStarsList = [0, 0, 0, 0, 0]

      // 电影名截短
      if (tempTitle.length >= 6) {
        tempTitle = tempTitle.substring(0, 5) + '...'
      }

      // 星级，一个5个元素的数组，点亮星置为1
      for (var j = 0; j < tempStars / 10; j++) {
        tempStarsList[j] = 1
      }

      movieList[i] = {
        img: data['subjects'][i]['images']['small'],
        title: tempTitle,
        rating: data['subjects'][i]['rating']['average'],
        starsList: tempStarsList,
        movieId: data['subjects'][i]['id'],
      }

    }

    this.setData({
      moreMovieData: movieList
    })

    console.log(this.data.moreMovieData)


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var category = options.category

    console.log(category)

    this.setData({
      navigateTitle: category
    })

    var dataUrl = ''

    switch (category) {
      case '正在热映':
        dataUrl = app.globalData.g_doubanBase + '/v2/movie/in_theaters'
        break;
      case '即将上映':
        dataUrl = app.globalData.g_doubanBase + '/v2/movie/coming_soon'
        break;
      case 'Top250':
        dataUrl = app.globalData.g_doubanBase + '/v2/movie/top250'
        break;
    }

    this.getMovieListData(dataUrl)

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