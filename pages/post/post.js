// pages/post/post.js

//模拟外部获取数据
var testDataSource=require('./postData.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // testData:[]

  },
  onPostDetail(event){

    var postId=event.currentTarget.dataset.postid

    console.log(postId)


    wx.navigateTo({
      url: './post-detail/post-detail',
    })
    

  }
  ,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('onLoad')

    this.setData({
      testData: testDataSource.data
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log('onReady')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log('onShow')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log('onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log('onUnload')
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