// pages/post/post-detail/post-detail.js


//模拟外部获取数据
var testDataSource = require('../postData.js')

//获取全局变量
var app=getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {

    postId: 0,
    postFavor:[
      false,false,false
    ],
    isPlay:false,
    currentData:''


  },

// 音乐播放 用的老方法，新方法的暂停没搞好
  playMusic() {

    if(this.data.isPlay){
      wx.pauseBackgroundAudio()

      this.setData({
        isPlay:false
      })
    }
    else{
      // 链接不能是本地，必须是外网地址
      wx.playBackgroundAudio({
        dataUrl: 'http://other.web.nf01.sycdn.kuwo.cn/resource/n3/82/50/3825930667.mp3',
        title:'MUSIC',
        coverImgUrl:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=726026504,4224028279&fm=11&gp=0.jpg'
        
      })

      this.setData({
        isPlay: true
      })
    }

  },

  // 收藏或取消收藏
  setFavor() {

    this.data.postFavor[this.data.postId] = !this.data.postFavor[this.data.postId]

    this.setData({
      postFavor: this.data.postFavor
    })

    wx.showToast({
      title: this.data.postFavor[this.data.postId]?'收藏成功':'取消成功'
    })

    wx.setStorageSync('postFavor', this.data.postFavor)

  },

  // 分享功能
  shareFun(){
    wx.showActionSheet({
      itemList: [
        "分享给微信好友",
        "分享给qq好友",
        "分享到朋友圈",
      ],
      success(res){
        wx.showToast({
          title: '点击了--' +res.tapIndex,
        })
      }
    })

  }
  ,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      postId: app.postId,//app.postId
      currentData: testDataSource.data2[app.postId]//app.postId
    })

    if(wx.getStorageSync('postFavor')){
      this.setData({
        postFavor: wx.getStorageSync('postFavor'),
      })
    }

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