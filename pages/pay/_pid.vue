<template>
  <div class="cart py-container">
    <!--主内容-->
    <div class="checkout py-container pay">
      <div class="checkout-tit">
        <h4 class="fl tit-txt">
          <span class="success-icon"></span
          ><span class="success-info"
            >订单提交成功，请您及时付款！订单号：{{
              payObj.out_trade_no
            }}</span
          >
        </h4>
        <span class="fr"
          ><em class="sui-lead">应付金额：</em
          ><em class="orange money">￥{{ payObj.total_fee }}</em></span
        >
        <div class="clearfix"></div>
      </div>
      <div class="checkout-steps">
        <div class="fl weixin">微信支付</div>
        <div class="fl sao">
          <p class="red">请使用微信扫一扫。</p>
          <div class="fl code">
            <!-- <img id="qrious" src="~/assets/img/erweima.png" alt=""> -->
            <!-- <qriously value="weixin://wxpay/bizpayurl?pr=R7tnDpZ":size="338"/> -->
            <!--code_url为二维码地址，这里需要通过一个vue的组件【qriously】显示-->
            <!--执行npm install vue-qriously下载组件-->
            <qriously :value="payObj.code_url" :size="338" />
            <div class="saosao">
              <p>请使用微信扫一扫</p>
              <p>扫描二维码支付</p>
            </div>
          </div>
        </div>
        <div class="clearfix"></div>
        <!-- <p><a href="pay.html" target="_blank">> 其他支付方式</a></p> -->
      </div>
    </div>
  </div>
</template>

<script>
import ordersApi from '@/api/orders'
export default {
    data(){
        return{
            orderId:'',
            payObj:{},
            timer1:''
        }
    },
    methods:{
        getOrderId(){
            if(this.$route.params && this.$route.params.pid){
                this.orderId=this.$route.params.pid
            }
        },
        getNative(){
            ordersApi.createNative(this.orderId).then(
                response=>{
                    this.payObj=response.data.data
                }
            )
        },
        queryOrderStatus(orderNo){
            ordersApi.queryPayStatus(orderNo).then(
                response=>{
                    if(response.data.success){
                        //支付成功则清除
                        clearInterval(this.timer1)
                        //提示
                        this.$message({
                            type:'success',
                            message:'支付成功！'
                        })
                        //跳转回到课程详情页面
                        this.$router.push({
                            path:'/course/'+this.payObj.course_id
                        })
                    }
                }
            )
        }
        
    },
    created(){
        this.getOrderId()
        this.getNative()
    },
    //每隔三秒调用一次查询订单状态的方法
    mounted() { //页面渲染之后调用
        this.timer1=setInterval(()=>{
            // setTimeout(()=>{
            //     this.queryOrderStatus()
            // },500)
            this.queryOrderStatus(this.payObj.out_trade_no)
        },3000)
        
    },
}
</script>