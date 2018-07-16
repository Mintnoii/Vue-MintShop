<template>
  <div class="shop_container">
    <ul class="shop_list">
      <li class="shop_li border-1px">
        <a>
          <div class="shop_left">
            <img class="shop_img" src="./images/shop/1.jpg">
          </div>
          <div class="shop_right">
            <section class="shop_detail_header">
              <h4 class="shop_title ellipsis">锄禾日当午，汗滴禾下土</h4>
              <ul class="shop_detail_ul">
                <li class="supports">保</li>
                <li class="supports">准</li>
                <li class="supports">票</li>
              </ul>
            </section>
            <section class="shop_rating_order">
              <section class="shop_rating_order_left">
                <div class="star star-24">
                  <span class="star-item on"></span>
                  <span class="star-item on"></span>
                  <span class="star-item on"></span>
                  <span class="star-item half"></span>
                  <span class="star-item off"></span>
                </div>
                <div class="rating_section">
                  3.6
                </div>
                <div class="order_section">
                  月售106单
                </div>
              </section>
              <section class="shop_rating_order_right">
                <span class="delivery_style delivery_right">Mint专送</span>
              </section>
            </section>
            <section class="shop_distance">
              <p class="shop_delivery_msg">
                <span>¥20起送</span>
                <span class="segmentation">/</span>
                <span>配送费约¥5</span>
              </p>
            </section>
          </div>
        </a>
      </li>
      <li class="shop_li border-1px">
        <a>
          <div class="shop_left">
            <img class="shop_img" src="./images/shop/2.jpg">
          </div>
          <div class="shop_right">
            <section class="shop_detail_header">
              <h4 class="shop_title ellipsis">锄禾日当午，汗滴禾下土</h4>
              <ul class="shop_detail_ul">
                <li class="supports">保</li>
                <li class="supports">准</li>
                <li class="supports">票</li>
              </ul>
            </section>
            <section class="shop_rating_order">
              <section class="shop_rating_order_left">
                <div class="star star-24">
                  <span class="star-item on"></span>
                  <span class="star-item on"></span>
                  <span class="star-item on"></span>
                  <span class="star-item on"></span>
                  <span class="star-item off"></span>
                </div>
                <div class="rating_section">
                  4.1
                </div>
                <div class="order_section">
                  月售106单
                </div>
              </section>
              <section class="shop_rating_order_right">
                <span class="delivery_style delivery_right">Mint专送</span>
              </section>
            </section>
            <section class="shop_distance">
              <p class="shop_delivery_msg">
                <span>¥20起送</span>
                <span class="segmentation">/</span>
                <span>配送费约¥5</span>
              </p>
            </section>
          </div>
        </a>
      </li>
      <li class="shop_li border-1px">
        <a>
          <div class="shop_left">
            <img class="shop_img" src="./images/shop/3.jpg">
          </div>
          <div class="shop_right">
            <section class="shop_detail_header">
              <h4 class="shop_title ellipsis">锄禾日当午，汗滴禾下土</h4>
              <ul class="shop_detail_ul">
                <li class="supports">保</li>
                <li class="supports">准</li>
                <li class="supports">票</li>
              </ul>
            </section>
            <section class="shop_rating_order">
              <section class="shop_rating_order_left">
                <div class="star star-24">
                  <span class="star-item on"></span>
                  <span class="star-item on"></span>
                  <span class="star-item on"></span>
                  <span class="star-item off"></span>
                  <span class="star-item off"></span>
                </div>
                <div class="rating_section">
                  3.2
                </div>
                <div class="order_section">
                  月售106单
                </div>
              </section>
              <section class="shop_rating_order_right">
                <span class="delivery_style delivery_right">Mint专送</span>
              </section>
            </section>
            <section class="shop_distance">
              <p class="shop_delivery_msg">
                <span>¥20起送</span>
                <span class="segmentation">/</span>
                <span>配送费约¥5</span>
              </p>
            </section>
          </div>
        </a>
      </li>
      <li class="shop_li border-1px">
        <a>
          <div class="shop_left">
            <img class="shop_img" src="./images/shop/4.jpg">
          </div>
          <div class="shop_right">
            <section class="shop_detail_header">
              <h4 class="shop_title ellipsis">锄禾日当午，汗滴禾下土</h4>
              <ul class="shop_detail_ul">
                <li class="supports">保</li>
                <li class="supports">准</li>
                <li class="supports">票</li>
              </ul>
            </section>
            <section class="shop_rating_order">
              <section class="shop_rating_order_left">
                <div class="star star-24">
                  <span class="star-item on"></span>
                  <span class="star-item on"></span>
                  <span class="star-item on"></span>
                  <span class="star-item half"></span>
                  <span class="star-item off"></span>
                </div>
                <div class="rating_section">
                  3.6
                </div>
                <div class="order_section">
                  月售106单
                </div>
              </section>
              <section class="shop_rating_order_right">
                <span class="delivery_style delivery_right">Mint专送</span>
              </section>
            </section>
            <section class="shop_distance">
              <p class="shop_delivery_msg">
                <span>¥20起送</span>
                <span class="segmentation">/</span>
                <span>配送费约¥5</span>
              </p>
            </section>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .shop_container
    margin-bottom 50px
    .shop_list
    .shop_li
      bottom-border-1px(#f1f1f1)
      width 100%
      >a
        clearFix()
        display block
        box-sizing border-box
        padding 15px 8px
        width 100%
        .shop_left
          float left
          box-sizing border-box
          width 23%
          height 75px
          padding-right 10px
          .shop_img
            display block
            width 100%
            height 100%
        .shop_right
          float right
          width 77%
          .shop_detail_header
            clearFix()
            width 100%
            .shop_title
              float left
              width 200px
              color #333
              font-size 16px
              line-height 16px
              font-weight 700
              &::before
                content '品牌'
                display inline-block
                font-size 11px
                line-height 11px
                color #333
                background-color #ffd930
                padding 2px 2px
                border-radius 2px
                margin-right 5px
            .shop_detail_ul
              float right
              margin-top 3px
              .supports
                float left
                font-size 10px
                color #999
                border 1px solid #f1f1f1
                padding 0 2px
                border-radius 2px
          .shop_rating_order
            clearFix()
            width 100%
            margin-top 18px
            margin-bottom 8px
            .shop_rating_order_left
              float left
              color #ff9a0d
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
                      bg-image('./images/stars/star48_on')
                    &.half
                      bg-image('./images/stars/star48_half')
                    &.off
                      bg-image('./images/stars/star48_off')
                &.star-36
                  .star-item
                    width 15px
                    height 15px
                    margin-right 6px
                    background-size 15px 15px
                    &:last-child
                      margin-right 0
                    &.on
                      bg-image('./images/stars/star36_on')
                    &.half
                      bg-image('./images/stars/star36_half')
                    &.off
                      bg-image('./images/stars/star36_off')
                &.star-24
                  .star-item
                    width 10px
                    height 10px
                    margin-right 3px
                    background-size 10px 10px
                    &:last-child
                      margin-right 0
                    &.on
                      bg-image('./images/stars/star24_on')
                    &.half
                      bg-image('./images/stars/star24_half')
                    &.off
                      bg-image('./images/stars/star24_off')
              .rating_section
                float left
                font-size 10px
                color #ff6000
                margin-left 4px
              .order_section
                float left
                font-size 10px
                color #666
                transform scale(.8)
            .shop_rating_order_right
              float right
              font-size 0
              .delivery_style
                transform-origin 35px 0
                transform scale(.7)
                display inline-block
                font-size 12px
                padding 1px
                border-radius 2px
              .delivery_left
                color #fff
                margin-right -10px
                background-color #02a774
                border 1px solid #02a774
              .delivery_right
                color #02a774
                border 1px solid #02a774
          .shop_distance
            clearFix()
            width 100%
            font-size 12px
            .shop_delivery_msg
              float left
              transform-origin 0
              transform scale(.9)
              color #666
            .segmentation
              color #ccc
</style>
