<template>
  <div class="vsitorsta">
    <div class="vsitorsta-data">
      <span>日期范围</span>
      <div>最近7天</div>
      <div>最近30天</div>
    </div>
    <div class="cho-data">
      <input @click="getStart" />
      <span>至</span>
      <input @click="getEnd" />
    </div>

    <div class="accessdata">
      <span class="accessdata-title">访问数据</span>
      <div class="accessdata-box">
        <div class="accessdata-for">
          <span clss="for-date">今日</span>
          <span class="for-number">6</span>
        </div>
        <div class="accessdata-for">
          <span clss="for-date">昨日</span>
          <span class="for-number">6</span>
        </div>
        <div class="accessdata-for">
          <span clss="for-date">本月</span>
          <span class="for-number">6</span>
        </div>
      </div>
      <div class="acc-all">
        <span class="title">累计访问人数</span>
        <span>6</span>
      </div>
    </div>
    <div class="datalinechar">
      <div class="linechar-title">2019-09-29至2019-10-02 访问数据分析</div>
      <div class="line-char">
        <ve-line :data="chartData"></ve-line>
      </div>
    </div>
    <div class="interaction">
      <div class="interaction-title">互动事件统计</div>
      <div class="interaction-context">
        <span class="context-text">保存次数</span>
        <span class="context-num">0</span>
      </div>
      <div class="interaction-context">
        <span class="context-text">拨打次数</span>
        <span class="context-num">0</span>
      </div>
    </div>
    <div class="pie-char">
      <div class="citytatistics">按城市统计</div>
      <ve-pie :data="piechartData"></ve-pie>
    </div>
      <div class="pie-char">
      <div class="citytatistics">按客户端类型</div>
      <ve-pie :data="piechartData"></ve-pie>
    </div>

    <van-popup v-model="showStart" position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker v-model="currentDateStart" type="date" :min-date="minDate" />
    </van-popup>
    <van-popup v-model="showEnd" position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker v-model="currentDateEnd" type="date" :min-date="minDate" />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "vsitorsta",
  data() {
    return {
      showStart: false,
      showEnd: false,
      currentDateStart: new Date(),
      currentDateEnd: new Date(),
      chartData: {
        columns: ["日期", "访问用户"],
        rows: [
          { 日期: "1/1", 访问用户: 1393 },
          { 日期: "1/2", 访问用户: 3530 },
          { 日期: "1/3", 访问用户: 2923 },
          { 日期: "1/4", 访问用户: 1723 },
          { 日期: "1/5", 访问用户: 3792 },
          { 日期: "1/6", 访问用户: 4593 }
        ]
      },
      piechartData: {
        columns: ["城市", "访问用户"],
        rows: [
          { 城市: "湖北省", 访问用户: 1393 },
          { 城市: "湖南省", 访问用户: 3530 },
        //   { 城市: "1/3", 访问用户: 2923 },
        //   { 城市: "1/4", 访问用户: 1723 },
        //   { 城市: "1/5", 访问用户: 3792 },
        //   { 城市: "1/6", 访问用户: 4593 }
        ]
      }
    };
  },
  methods: {
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
  .pie-char{
      padding:20px;
      border-bottom: 20px solid #eee;
      .citytatistics{
          width:160px;
          height:70px;
          background:#eee;
          text-align: center;
          line-height: 70px;
          margin:20px;

      }

  }
}
</style>