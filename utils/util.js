const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 星值变星星数组
 */
function convertToStarsArray(stars) {
  var starsList = [0, 0, 0, 0, 0]
  // 星级，一个5个元素的数组，点亮星置为1
  for (var j = 0; j < stars / 10; j++) {
    starsList[j] = 1
  }

  return starsList

}

/**
 * 演员
 */
function convertToCastString(casts) {

  var castjoin = ''
  for (var idx in casts) {
    castjoin = castjoin + casts[idx].name + ' / '
  }

  // -2是为了把最后一个斜杠去掉
  return castjoin.substring(0, castjoin.length - 2)

}

function convertToCastInfos(casts) {

  var castsArray = []

  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : '',
      name: casts[idx].name
    }
    castsArray.push(cast)
  }

  return castsArray

}


module.exports = {
  formatTime: formatTime,
  convertToStarsArray: convertToStarsArray,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos
}