<template>
  <div>
    <section class="profile">
      <HeaderTop title="我的"></HeaderTop>
      <section class="profile-number">
      <!-- 利用router-link实现到Login组件的跳转 -->
        <router-link :to="userInfo._id ? '/userinfo': '/login'" class="profile-link">
          <div class="profile_image">
            <i class="iconfont icon-yonghuming"></i>
          </div>
          <div class="user-info">
            <p class="user-info-top" v-if="!userInfo.phone" >{{userInfo.name || '登录/注册'}}</p>
            <p>
              <span class="user-icon">
                <i class="iconfont icon-msnui-tel icon-mobile"></i>
              </span>
              <span class="icon-mobile-number">{{userInfo.phone || '暂无绑定手机号'}}</span>
            </p>
          </div>
          <span class="arrow">
            <i class="iconfont icon-previewright"></i>
          </span>
        </router-link>
      </section>
      <section class="profile_info_data border-1px">
        <ul class="info_data_list">
          <a href="javascript:" class="info_data_link">
            <span class="info_data_top"><span>0.00</span>元</span>
            <span class="info_data_bottom">我的余额</span>
          </a>
          <a href="javascript:" class="info_data_link">
            <span class="info_data_top"><span>0</span>个</span>
            <span class="info_data_bottom">我的优惠</span>
          </a>
          <a href="javascript:" class="info_data_link">
            <span class="info_data_top"><span>0</span>分</span>
            <span class="info_data_bottom">我的积分</span>
          </a>
        </ul>
      </section>
      <section class="profile_my_order border-1px">
        <!-- 我的订单 -->
        <a href='javascript:' class="my_order">
          <span>
            <i class="iconfont icon-dingdan"></i>
          </span>
          <div class="my_order_div">
            <span>我的订单</span>
            <span class="my_order_icon">
              <i class="iconfont icon-previewright"></i>
            </span>
          </div>
        </a>
        <!-- 积分商城 -->
        <a href='javascript:' class="my_order">
          <span>
            <i class="iconfont icon-jifen"></i>
          </span>
          <div class="my_order_div">
            <span>积分商城</span>
            <span class="my_order_icon">
              <i class="iconfont icon-previewright"></i>
            </span>
          </div>
        </a>
        <!-- Mint外卖会员卡 -->
        <a href="javascript:" class="my_order">
          <span>
            <i class="iconfont icon-viptehuishiduan"></i>
          </span>
          <div class="my_order_div">
            <span>Mint外卖会员卡</span>
            <span class="my_order_icon">
              <i class="iconfont icon-previewright"></i>
            </span>
          </div>
        </a>
      </section>
      <section class="profile_my_order border-1px">
        <!-- 服务中心 -->
        <a href="javascript:" class="my_order">
          <span>
            <i class="iconfont icon-lianxikefu"></i>
          </span>
          <div class="my_order_div">
            <span>服务中心</span>
            <span class="my_order_icon">
              <i class="iconfont icon-previewright"></i>
            </span>
          </div>
        </a>
      </section>
      <section class="profile_my_order border-1px">
        <mt-button type="danger" style="width: 100%" v-if="userInfo._id" @click="logout">退出登录</mt-button>
      </section>
    </section>
  </div>
</template>

<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import {mapState} from 'vuex'
import { MessageBox, Toast } from 'mint-ui'
export default {
  components: {
    HeaderTop
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    logout () {
      MessageBox.confirm('确认退出吗?').then(
        action => {
          // 请求退出
          this.$store.dispatch('logout')
          Toast('退出成功')
        },
        action => {
          console.log('取消登录')
        }
      )
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .profile
    width 100%
    overflow hidden
    .header //头部公共css
      background-color #02a774
      position fixed
      z-index 100
      left 0
      top 0
      width 100%
      height 45px
      .header_search
        position absolute
        left 15px
        top 50%
        transform translateY(-50%)
        width 10%
        height 50%
        .iconfont
          font-size 22px
          color #fff
      .header_title
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        width 30%
        color #fff
        font-size 22px
        text-align center
    .profile-number
      margin-top 45.5px
      .profile-link
        clearFix()
        position relative
        display block
        background #02a774
        padding 20px 10px
        .profile_image
          float left
          width 60px
          height 60px
          border-radius 50%
          overflow hidden
          vertical-align top
          .icon-yonghuming
            background #e4e4e4
            font-size 62px
        .user-info
          float left
          margin-top 8px
          margin-left 15px
          p
            font-weight: 700
            font-size 18px
            color #fff
            &.user-info-top
              padding-bottom 8px
            .user-icon
              display inline-block
              margin-left -15px
              margin-right 5px
              width 20px
              height 20px
              .icon-mobile
                font-size 30px
                vertical-align text-top
            .icon-msnui-tel
              font-size 14px
              color #fff
        .arrow
          width 12px
          height 12px
          position absolute
          right 15px
          top 40%
          .icon-previewright
            color #fff
            font-size 5px
    .profile_info_data
      bottom-border-1px(#e4e4e4)
      width 100%
      background #fff
      overflow hidden
      .info_data_list
        clearFix()
        .info_data_link
          float left
          width 33%
          text-align center
          border-right 1px solid #f1f1f1
          .info_data_top
            display block
            width 100%
            font-size 14px
            color #333
            padding 15px 5px 10px
            span
              display inline-block
              font-size 30px
              color #f90
              font-weight 700
              line-height 30px
          .info_data_bottom
            display inline-block
            font-size 14px
            color #666
            font-weight 400
            padding-bottom 10px
        .info_data_link:nth-of-type(2)
          .info_data_top
            span
              color #ff5f3e
        .info_data_link:nth-of-type(3)
          border 0
          .info_data_top
            span
              color #6ac20b
    .profile_my_order
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .my_order
        display flex
        align-items center
        padding-left 15px
        >span
          display flex
          align-items center
          width 20px
          height 20px
          >.iconfont
            margin-left -10px
            font-size 30px
          .icon-dingdan
            color #02a774
          .icon-jifen
            color #ff5f3e
          .icon-viptehuishiduan
            color #f90
          .icon-lianxikefu
            color #02a774
        .my_order_div
          width 100%
          border-bottom 1px solid #f1f1f1
          padding 18px 10px 18px 0
          font-size 16px
          color #333
          display flex
          justify-content space-between
          span
            display block
          .my_order_icon
            width 10px
            height 10px
            .icon-previewright
              color #bbb
              font-size 10px
</style>
