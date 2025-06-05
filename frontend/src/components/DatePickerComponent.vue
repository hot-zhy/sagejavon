<template>
  <DatePicker
    v-model="date"
    :local="local"
    placeholder="请选择注册时间"
    format="YYYY-MM-DD"
    :disabled-date="disabledDate"
    clearable />
</template>

<script>
import DatePicker from 'vue-datepicker-local'

export default {
  components: {
    DatePicker
  },
  data() {
    return {
      date: new Date(), // 默认选择当前日期
      local: { // 定制化日期选择的格式内容
        dow: 1, // 星期的第一天
        yearSuffix: '年', // 年份后缀
        monthsHead: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'), // 头部月份
        months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'), // 面板月份
        weeks: '一_二_三_四_五_六_日'.split('_') // 星期
      }
    }
  },
  methods: {
    disabledDate(date) {
      const now = new Date();
      if (date.getTime() > now.getTime()) return true; // 禁用未来日期
      const fiftyYearsAgo = new Date(now.getFullYear() - 50, now.getMonth(), now.getDate());
      return date < fiftyYearsAgo; // 禁用50年前的日期
    }
  }
}
</script>

<style scoped>
.datepicker {
  width: 290px;
  height: 40px;
  line-height: 40px;
  /deep/ input {
    color: #444;
    height: 40px;
    line-height: 40px;
  }
  /deep/ .focus {
    border: 1px solid #42b983; /* 替换为你的主色调 */
  }
  /deep/ .datepicker-popup {
    width: 278px;
    .calendar-head {
      width: 278px;
      .calendar-year-select, .calendar-month-select  {
        font-size: 14px;
        &:hover {
          color: #42b983; /* 替换为你的主色调 */
        }
      }
      .calendar-prev-year-btn, .calendar-prev-month-btn, .calendar-next-year-btn, .calendar-next-month-btn {
        &:hover {
          color: #42b983; /* 替换为你的主色调 */
        }
      }
    }
    .calendar-body {
      width: 278px;
      height: 200px;
      .calendar-date {
        line-height: 100%;
      }
      .calendar-date-selected {
        background: #42b983; /* 替换为你的主色调 */
      }
    }
    .datepicker__buttons {
      .datepicker__button-cancel {
        background: #E3E3E3;
      }
      .datepicker__button-select {
        background: #42b983; /* 替换为你的主色调 */
      }
    }
  }
  .calendar-date-selected {
    background: #42b983; /* 替换为你的主色调 */
  }
}
</style>
