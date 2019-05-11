<template>
    <v-flex xs12 pt-2>
      <v-card
      @mouseover="hover = true"
      @mouseleave="hover = false"
      :class="{ 'elevation-5': hover }"
      >
        <v-card-title>
          <v-flex xs1 class="header">
            <v-icon class="ready--text">brightness_1</v-icon>
          </v-flex>
          <v-flex xs1 class="header">
            <span class="grey--text hed_prename">СЗ:</span> <span class="font-weight-light" title="Служебная записка от: 12 апреля 2018">112</span>
          </v-flex>
          <v-flex xs4 class="header">
            <span class="grey--text hed_prename">Контрагент:</span> <span class="font-weight-bold" v-on:click="collapsed = !collapsed">ТОВ "Захід Агропром"</span>
          </v-flex>
          <v-flex xs3 class="header">
            <span class="grey--text hed_prename">Отгрузка:</span> <span class="font-weight-light" title="Отгрузка: с 12 мая 2019, по 1 апреля 2019">21.10.2018 - 03.02.2020, 37дн.</span>
          </v-flex>
          <v-flex xs3 class="header worker">
            <div class="workitem" style="background-color: #fff2c8"><div>Ц</div><div>!</div></div>
            <div class="workitem" style="background-color: #e2efda"><div>М</div><div>></div></div>
            <div class="workitem" style="background-color: #ddebf7"><div>К</div><div>!</div></div>
            <div class="workitem" style="background-color: #8ea9db"><div>З</div><div>Х</div></div>
            <div class="workitem" style="background-color: #ff9090"><div>Ц</div><div>!</div></div>
            <div class="workicon"><v-icon style="font-size:20px" v-on:click="collapsed = !collapsed">unfold_more</v-icon></div>
          </v-flex>
        </v-card-title>
        <div v-if="collapsed">
        <v-card-actions v-if="dates">
          <v-flex class="tbl">
            <div class="tblitem tblstatus">75дн.</div>
            <div class="tblitem tbldate">01.01-01.02.2020</div>
            <div class="tblitem tblname">Силоси металеві вентильовані уніфіковані типу СМВУ.110.12.К45.В12</div>
            <div class="tblitem tblnumber">2311714</div>
            <div class="tblitem tblquantity">60</div>
            <div class="tblitem tblnumofficenotes">85, 2604191, 2604193</div>
          </v-flex>
        </v-card-actions>

        <v-card-actions v-if="schedule">
          <div>График</div>
        </v-card-actions>

        <v-card-actions v-if="shortage">
          <div>Дефицит</div>
        </v-card-actions>

        <v-card-actions v-if="files">
          <div>Файлы</div>
        </v-card-actions>
        <v-card-actions>
          <v-btn flat color="orange" v-on:click="dates = !dates">Даты</v-btn>
          <v-btn flat color="orange" v-on:click="schedule = !schedule">График</v-btn>
          <v-btn flat color="orange" v-on:click="shortage = !shortage">Дефицит</v-btn>
          <v-btn flat color="orange" v-on:click="files = !files">Файлы</v-btn>
        </v-card-actions>
        </div>
      </v-card>
    </v-flex>
</template>

<script>
export default {
  props: ["officenote"],
  data() {
    return {
      posts: [],
      hover: false,
      collapsed:true,
      dates:true,
      schedule:false,
      shortage:false,
      files:false,
    };
  },
};
</script>


<style>
.header {
  padding-right: 10px;
}
.hed_prename {
  font-style: italic;
}
.v-card__title {
    padding: 3px 3px 3px;
}
.worker {
  display: flex;
  flex-wrap: nowrap;
}
.worker > div {
  text-align: center;
  border-radius: 4px;
}
.worker > .workitem {
  width: 18%;
  margin-right: 6px;
  display: flex;
  justify-content: space-between;
  padding: 0px 8px 0px 8px;
}
.worker > .workicon {
  width: 6%;
}
.tbl {
  display: flex;
  flex-wrap: nowrap;
}
.tbl > .tblitem {
  margin-right: 6px;
  padding: 0px 8px 0px 8px;
}
.tbl > .tblstatus {
  width: 50px;
  background-color: #f2f2f2;
}
.tbl > .tbldate {
  width: 130px;
  background-color: #d9d9d9;
}
.tbl > .tblname {
  background-color: #f2f2f2;
}
.tbl > .tblnumber {
  background-color: #f2f2f2;
  color: #203516;
  font-weight: bold;
}
.tbl > .tblquantity {
  background-color: #f2f2f2;
  color: #550000;
}
.tbl > .tblnumofficenotes {
  background-color: #f2f2f2;
}
</style>
