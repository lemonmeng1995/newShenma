<template>
  <div class="vsitorsta">
    <div class="vsitorsta-data">
      <span>日期范围</span>

      <div :class="{active : (status ==1 ? true : false)}" @click="getStatus('1')">最近7天</div>
      <div :class="{active : (status ==2 ? true : false)}" @click="getStatus('2')">最近30天</div>
    </div>
    <div class="cho-data">
      <input @click="getStart" v-model="dateStart" />
      <span>至</span>
      <input @click="getEnd" v-model="dateEnd" />
    </div>

    <div class="accessdata">
      <span class="accessdata-title">访问数据</span>
      <div class="accessdata-box">
        <div class="accessdata-for">
          <span clss="for-date">今日</span>
          <span class="for-number">{{todayCount}}</span>
        </div>
        <div class="accessdata-for">
          <span clss="for-date">昨日</span>
          <span class="for-number">{{yesterdayCount}}</span>
        </div>
        <div class="accessdata-for">
          <span clss="for-date">本月</span>
          <span class="for-number">{{thisMonthCount}}</span>
        </div>
      </div>
      <div class="acc-all">
        <span class="title">累计访问人数</span>
        <span>{{count}}</span>
      </div>
    </div>
    <div class="datalinechar">
      <div class="linechar-title">{{dateStart}}至{{dateEnd}} 访问数据分析</div>
      <div class="line-char">
        <ve-line :data="chartData"></ve-line>
      </div>
    </div>
    <div class="interaction">
      <div class="interaction-title">互动事件统计</div>
      <div class="interaction-context">
        <span class="context-text">保存次数</span>
        <span class="context-num">{{savecount}}</span>
      </div>
      <div class="interaction-context">
        <span class="context-text">拨打次数</span>
        <span class="context-num">{{dialcount}}</span>
      </div>
    </div>
    <!-- <div class="pie-char">
      <div class="citytatistics">按城市统计</div>
      <ve-pie :data="piechartData"></ve-pie>
    </div>
      <div class="pie-char">
      <div class="citytatistics">按客户端类型</div>
      <ve-pie :data="piechartData"></ve-pie>
    </div>-->

    <van-popup v-model="showStart" position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker
        v-model="currentDateStart"
        type="date"
        @confirm="getDataconfirmStart"
        @cancel="getDatacancelStart"
      />
    </van-popup>
    <van-popup v-model="showEnd" position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker
        v-model="currentDateEnd"
        type="date"
        @confirm="getDataconfirmEnd"
        @cancel="getDatacancelEnd"
      />
    </van-popup>
  </div>
</template>

<script>
import { baseUrl } from "@/tools/httpApi";
export default {
  name: "vsitorsta",
  data() {
    return {
      status: "1",
      showStart: false,
      showEnd: false,
      dateStart: "",
      dateEnd: "",
      dialcount: "", // 是拨打次数
      savecount: "", // 是保存次数
      count: "", // 是累计访问次数
      todayCount: "", //今日
      thisMonthCount: "", //本月
      yesterdayCount: "", //昨日
      currentDateStart: new Date(),
      currentDateEnd: new Date(),
      chartData: {
        columns: ["day", "total"],
        rows: [
          { day: "1/1", total: 1393 },
         
        ]
      },
      piechartData: {
        columns: ["城市", "访问用户"],
        rows: [
          { 城市: "湖北省", 访问用户: 1393 },
          { 城市: "湖南省", 访问用户: 3530 }
          //   { 城市: "1/3", 访问用户: 2923 },
          //   { 城市: "1/4", 访问用户: 1723 },
          //   { 城市: "1/5", 访问用户: 3792 },
          //   { 城市: "1/6", 访问用户: 4593 }
        ]
      }
    };
  },
  created() {
    //POST /smUserlog/selectSmUserlogTotal beginTime  endTime
    this.getData();
  },
  methods: {
    getData() {
      let beginTime = "";
      let endTime = "";
      let nowdate = new Date();

      let mymonth;
      let mydate;
      if (nowdate.getDate() < 10) {
        mydate = "0" + nowdate.getDate(); //补齐
      } else {
        mydate = nowdate.getDate(); //补齐
      }

      if (nowdate.getMonth() + 1 < 10) {
        mymonth = "0" + (nowdate.getMonth() + 1); //补齐
      } else {
        mymonth = nowdate.getMonth() + 1; //补齐
      }

      //获取系统前一周的时间
      let m;
      let d;
      var oneweekdate = new Date(nowdate - 7 * 24 * 3600 * 1000);
      if (oneweekdate.getDate() < 10) {
        d = "0" + oneweekdate.getDate(); //补齐
      } else {
        d = oneweekdate.getDate(); //补齐
      }

      if (oneweekdate.getMonth() + 1 < 10) {
        m = "0" + (oneweekdate.getMonth() + 1); //补齐
      } else {
        m = oneweekdate.getMonth() + 1; //补齐
      }

      var y = oneweekdate.getFullYear();

      var formatwdate = y + "-" + m + "-" + d;
      beginTime = formatwdate;
      this.dateStart = beginTime;


      var y = nowdate.getFullYear();
      endTime = y + "-" + mymonth + "-" + mydate;
      this.dateEnd = endTime;
      var formData = new FormData();
      formData.append("customerNo",  localStorage.getItem('customerNo'));
      formData.append("beginTime", beginTime);
      formData.append("endTime", endTime);
      this.fetch(this.apis.selectSmUserlogTotal, formData, "post").then(res => {
        console.log("res", res);
        if (res.errCode == "0000") {
          (this.todayCount = res.data.todayCount), //今日
            (this.thisMonthCount = res.data.thisMonthCount),
            (this.yesterdayCount = res.data.yesterdayCount),
            (this.count = res.data.count);
          this.dialcount = res.data.dialCount;
          this.savecount = res.data.saveCount;
          this.chartData.rows = res.data.echartsRes;
        }
      });
    },
    getStatus(state) {
      this.status = state;
      if (state == 1) {
        this.getData();
      } else {
        console.log("state,", state);
        let beginTime = "";
        let endTime = "";
        let nowdate = new Date();
        let mymonth;
        let mydate;
        if (nowdate.getDate() < 10) {
          mydate = "0" + nowdate.getDate(); //补齐
        } else {
          mydate = nowdate.getDate(); //补齐
        }

        if (nowdate.getMonth() + 1 < 10) {
          mymonth = "0" + (nowdate.getMonth() + 1); //补齐
        } else {
          mymonth = nowdate.getMonth() + 1; //补齐
        }

        //获取系统前一月的时间
        var oneweekdate = new Date(nowdate.setMonth(nowdate.getMonth() - 1));
        console.log("前一个月,", oneweekdate);
        var y = oneweekdate.getFullYear();
        let m;
        let d;

        if (oneweekdate.getDate() < 10) {
          d = "0" + oneweekdate.getDate(); //补齐
        } else {
          d = oneweekdate.getDate(); //补齐
        }

        if (oneweekdate.getMonth() + 1 < 10) {
          m = "0" + (oneweekdate.getMonth() + 1); //补齐
        } else {
          m = oneweekdate.getMonth() + 1; //补齐
        }

        var formatwdate = y + "-" + m + "-" + d;
        beginTime = formatwdate;
        this.dateStart = beginTime;

        //获取系统前一个月的时间
        // nowdate.setMonth(nowdate.getMonth()-1);
        var y = nowdate.getFullYear();

        endTime = y + "-" + mymonth + "-" + mydate;
        this.dateEnd = endTime;
        var formData = new FormData();
        formData.append("customerNo", localStorage.getItem('customerNo'));
        formData.append("beginTime", beginTime);
        formData.append("endTime", endTime);
        this.fetch(this.apis.selectSmUserlogTotal, formData, "post").then(
          res => {
            console.log("res", res);
            if (res.errCode == "0000") {
              (this.todayCount = res.data.todayCount), //今日
                (this.thisMonthCount = res.data.thisMonthCount),
                (this.yesterdayCount = res.data.yesterdayCount),
                (this.count = res.data.count);
              this.dialcount = res.data.dialCount;
              this.savecount = res.data.saveCount;
              this.chartData.rows = res.data.echartsRes;
            }
          }
        );
      }
    },
    getDataconfirmStart(value) {
      let youwantData;
      let d = new Date(value);
      youwantData =
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      this.dateStart = youwantData;

         var formData = new FormData();
        formData.append("customerNo", localStorage.getItem('customerNo'));
        formData.append("beginTime", this.dateStart );
        formData.append("endTime",  this.dateEnd);
        this.fetch(this.apis.selectSmUserlogTotal, formData, "post").then(
          res => {
            if (res.errCode == "0000") {
              (this.todayCount = res.data.todayCount), //今日
                (this.thisMonthCount = res.data.thisMonthCount),
                (this.yesterdayCount = res.data.yesterdayCount),
                (this.count = res.data.count);
              this.dialcount = res.data.dialCount;
              this.savecount = res.data.saveCount;
              this.chartData.rows = res.data.echartsRes;
            }
          }
        );

      this.showStart = false;
    },
    getDatacancelStart() {
      this.showStart = false;
    },
    getDataconfirmEnd(value) {
      let youwantData;
      let d = new Date(value);
      youwantData =
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      this.dateEnd = youwantData;

         var formData = new FormData();
        formData.append("customerNo", localStorage.getItem('customerNo'));
        formData.append("beginTime", this.dateStart );
        formData.append("endTime",  this.dateEnd);
        this.fetch(this.apis.selectSmUserlogTotal, formData, "post").then(
          res => {
          
            if (res.errCode == "0000") {
              (this.todayCount = res.data.todayCount), //今日
                (this.thisMonthCount = res.data.thisMonthCount),
                (this.yesterdayCount = res.data.yesterdayCount),
                (this.count = res.data.count);
              this.dialcount = res.data.dialCount;
              this.savecount = res.data.saveCount;
              this.chartData.rows = res.data.echartsRes;
            }
          }
        );

      this.showEnd = false;
    },
    getDatacancelEnd() {
      this.showEnd = false;
    },
    getStart() {
      this.showStart = true;
    },
    getEnd() {
      this.showEnd = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.vsitorsta {
  margin-bottom: 120px;
  .vsitorsta-data {
    display: flex;
    padding: 10px;
    border-bottom: 3px solid #eee;
    span {
      font-size: 28px;
      font-family: Droid Sans Fallback;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      padding: 30px;
    }
    div {
      margin: 20px;
      text-align: center;
      line-height: 49px;
      width: 167px;
      height: 49px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(207, 204, 204, 1);
      border-radius: 25px;

      font-size: 28px;
      font-family: Droid Sans Fallback;
      font-weight: 400;
      color: rgba(99, 99, 99, 1);
    }
    .active {
      background-color: chartreuse;
    }
  }
  .cho-data {
    display: flex;
    padding: 20px;
    border-bottom: 19px solid #e5e5e5;
    input {
      padding: 10px;
      margin: 20px;
      border: 3px solid #eee;
      width: 30%;
    }
    span {
      font-size: 24px;
      margin: 30px 20px;
      font-family: Droid Sans Fallback;
      font-weight: 400;
      color: rgba(163, 163, 163, 1);
    }
  }
  .accessdata {
    padding: 20px;
    border-bottom: 20px solid #eee;
    .accessdata-title {
      font-size: 28px;
      font-family: Droid Sans Fallback;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
    }
    .accessdata-box {
      display: flex;
      border-bottom: 2px solid #eee;
      .accessdata-for {
        width: 30%;
        margin: 30px;
        text-align: center;
        .for-date {
          display: block;
          font-size: 24px;
          font-family: Droid Sans Fallback;
          font-weight: 400;
          color: rgba(163, 163, 163, 1);
        }
        .for-number {
          display: block;
          font-size: 28px;
          font-family: Droid Sans Fallback;
          font-weight: bold;
          color: rgba(0, 0, 0, 1);
          margin-top: 20px;
        }
      }
    }
    .acc-all {
      margin: 20px;
      span {
        font-size: 28px;
        font-family: Droid Sans Fallback;
        font-weight: bold;
        color: rgba(0, 0, 0, 1);
      }
      .title {
        font-size: 24px;
        font-family: Droid Sans Fallback;
        font-weight: 400;
        color: rgba(163, 163, 163, 1);
      }
    }
  }
  .datalinechar {
    padding: 20px;
    border-bottom: 20px solid #eee;
    .linechar-title {
      font-size: 28px;
      font-family: Droid Sans Fallback;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
    }
    .line-char {
      margin: 40px 0 0 0;
    }
  }
  .interaction {
    padding: 20px;
    border-bottom: 20px solid #eee;
    .interaction-title {
      font-size: 28px;
      font-family: Droid Sans Fallback;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
    }
    .interaction-context {
      margin: 20px;
      .context-text {
        font-size: 28px;
        font-family: Droid Sans Fallback;
        font-weight: 400;
        color: rgba(201, 183, 183, 0.87);
        margin-right: 20px;
      }
      .context-num {
        font-size: 30px;
        font-family: Droid Sans Fallback;
        font-weight: 800;
        color: rgba(0, 0, 0, 1);
      }
    }
  }
  .pie-char {
    padding: 20px;
    border-bottom: 20px solid #eee;
    .citytatistics {
      width: 160px;
      height: 70px;
      background: #eee;
      text-align: center;
      line-height: 70px;
      margin: 20px;
    }
  }
}
</style>