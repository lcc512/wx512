var amapFile = require('../../utils/amap-wx.js'); //如：..­/..­/libs/amap-wx.js


// pages/join/join.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    loading: false,
    chunjian:'',
    tapTarFlag:true,
    jinduNum:0,
    tuoluo:'0'
  },

  test1(event) {
    wx.showModal({

      title: '标题',

      content: '告知当前状态，信息和解决方法',

      confirmText: '主操作',

      cancelText: '次要操作',

      success: function(res) {

        if (res.confirm) {

          console.log('用户点击主操作')

        } else if (res.cancel) {

          console.log('用户点击次要操作')

        }

      }

    })
  },

  // 扫描二维码获取数据
  test2(){

    var that=this

    wx.scanCode({

      success: function (res) {

        var num = res.result // 获取到的num就是餐桌的编号

        that.setData({chunlian:num})
        

      }

    })
  }
  ,
  test3(){
    wx.chooseImage({
      success: chooseResult => {
        // 将图片上传至云存储空间
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: 'my-photo.png',
          // 指定要上传的文件的小程序临时文件路径
          filePath: chooseResult.tempFilePaths[0],
          // 成功回调
          success: res => {
            console.log('上传成功', res)
          },
        })
      },
    })
  },

  // 测试API
  test4(){

    var that=this

    console.log('-=-=-==-')

    
    
    // wx.startGyroscope({
    //   interval:'normal',
    //   success(res){

    //     that.setData({ tuoluo: 'res' })

    //     wx.onGyroscopeChange(function(res){



    //       that.setData({tuoluo:res.x})

    //     })
    //   }
    // })
    
    

  }
  ,
  loadFun() {

    var that = this

    this.setData({
      loading: true
    })


    setTimeout(function() {
      that.setData({
        loading: false
      })

      wx.showToast({ // 显示Toast

        title: '载入成功',

        icon: 'success',

        duration: 1500

      })

    }, 2000)

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {




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