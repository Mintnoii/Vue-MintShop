<template>
  <div class="food" v-if="isShow">
    <div class="food-content">
      <div class="image-header">
        <img v-lazy="food.image">
        <p class="foodpanel-desc">{{food.info}}</p>
        <div class="back" @click="toggleShow">
          <i class="iconfont icon-arrow_left"></i>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="now">￥{{food.price}}</span>
          <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
        </div>
        <div class="cartcontrol-wrapper">
          <CartControl :food="food"/>
        </div>
      </div>
    </div>
    <div class="food-cover" @click="toggleShow"></div>
  </div>
</template>

<script>
import CartControl from '../CartControl/CartControl.vue'

export default {
  props: {
    food: Object
  },

  data () {
    return {
      isShow: false
    }
  },

  methods: {
    toggleShow () {
      this.isShow = !this.isShow
    }
  },

  components: {
    CartControl
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"

  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 101
    width: 100%
    &.fade-enter-active, &.fade-leave-active
      transition opacity .5s
    &.fade-enter, &.fade-leave-to
      opacity 0
    .food-content
      position absolute
      left 50%
      top 50%
      transform translate(-50%, -50%)
      width 80%
      height 65%
      z-index 66
      background #fff
      border-radius 5px
      .image-header
        position: relative
        width: 100%
        height: 0
        padding-top: 100%
        img
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
        .foodpanel-desc
          font-size 10px
          color #ddd
          letter-spacing 0
          position absolute
          bottom 0
          left 0
          right 0
          padding 0 10px 10px
        .back
          position: absolute
          top: 10px
          left: 0
          .icon-arrow_left
            display: block
            padding: 10px
            font-size: 20px
            color: #fff
      .content
        position: relative
        padding: 18px
        .title
          line-height: 14px
          margin-bottom: 8px
          font-size: 14px
          font-weight: 700
          color: rgb(7, 17, 27)
        .detail
          margin-bottom: 18px
          line-height: 10px
          height: 10px
          font-size: 0
          .sell-count, .rating
            font-size: 10px
            color: rgb(147, 153, 159)
          .sell-count
            margin-right: 12px
        .price
          font-weight: 700
          line-height: 24px
          .now
            margin-right: 8px
            font-size: 14px
            color: rgb(240, 20, 20)
          .old
            text-decoration: line-through
            font-size: 10px
            color: rgb(147, 153, 159)
        .cartcontrol-wrapper
          position: absolute
          right: 12px
          bottom: 12px
        .buy
          position: absolute
          right: 18px
          bottom: 18px
          z-index: 10
          height: 24px
          line-height: 24px
          padding: 0 12px
          box-sizing: border-box
          border-radius: 12px
          font-size: 10px
          color: #fff
          background: rgb(0, 160, 220)
          &.fade-transition
            transition: all 0.2s
            opacity: 1
          &.fade-enter, &.fade-leave
            opacity: 0
    .food-cover
      position absolute
      top 0
      right 0
      bottom -48px
      left 0
      z-index 55
      background-color rgba(0, 0, 0, 0.5)

</style>
