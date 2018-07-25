<template>
  <div class="star" :class="'star-'+size">
    <span class="star-item" v-for="(sc, index) in starClasses" :class="sc" :key="index"></span>
  </div>
</template>
<script>
// 类名常量
const CLASS_ON = 'on'
const CLASS_HALF = 'half'
const CLASS_OFF = 'off'
export default {
  props: {
    score: Number,
    size: Number
  },
  computed: {
    /*
    3.2: 3 + 0 + 2
    4.7: 4 + 1 + 0
    */
    // 该方法产生一个数组starArr来表示on half off类名的span数量（总长度为5）
    starClasses () {
      const {score} = this
      const starArr = []
      // 向starArr中添加n个CLASS_ON
      const scoreInteger = Math.floor(score)
      for (let i = 0; i < scoreInteger; i++) {
        starArr.push(CLASS_ON)
      }
      // 向starArr中添加0/1个CLASS_HALF
      if (score * 10 - scoreInteger * 10 >= 5) {
        starArr.push(CLASS_HALF)
      }
      // 向starArr中添加n个CLASS_OFF
      while (starArr.length < 5) {
        starArr.push(CLASS_OFF)
      }
      return starArr
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/star48_on')
        &.half
          bg-image('./images/star48_half')
        &.off
          bg-image('./images/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star36_on')
        &.half
          bg-image('./images/star36_half')
        &.off
          bg-image('./images/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star24_on')
        &.half
          bg-image('./images/star24_half')
        &.off
          bg-image('./images/star24_off')
</style>
