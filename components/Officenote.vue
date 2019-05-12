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
          <v-layout v-if="dates" row wrap>
            <v-flex xs12 class="tbl">
              <div class="tblitem tblstatus hed">Статус</div>
              <div class="tblitem tbldate hed">Отгрузка</div>
              <div class="tblitem tblname hed">Продукция</div>
              <div class="tblitem tblnumber hed">№ Заказа</div>
              <div class="tblitem tblquantity hed">Кол-во</div>
              <div class="tblitem tblnumofficenotes hed">№№ СЗ</div>
              <div class="tblitem officenote hed">СЗ</div>
              <div class="tblitem picking hed">Компл.</div>
              <div class="tblitem shipping hed">Отгр.</div>
              <div class="tblitem designer hed">Констр.</div>
              <div class="tblitem drawingchanges hed">Изм.Ч.</div>
            </v-flex>

            <v-flex xs12 class="tbl">
              <div class="tblitem tblstatus">-175дн.</div>
              <div class="tblitem tbldate">01.01-01.02.2020</div>
              <div class="tblitem tblname">Силоси металеві вентильовані уніфіковані типу СМВУ.110.12.К45.В12</div>
              <div class="tblitem tblnumber">2311714</div>
              <div class="tblitem tblquantity">60000</div>
              <div class="tblitem tblnumofficenotes">2604191, 2604191, 2604193, 2604193</div>
              <div class="tblitem officenote">0дн.</div>
              <div class="tblitem picking">-1дн.</div>
              <div class="tblitem shipping">-12дн.</div>
              <div class="tblitem designer">-22дн.</div>
              <div class="tblitem drawingchanges">0дн.</div>
            </v-flex>

            <v-flex xs12 class="tbl">
              <div class="tblitem tblstatus">-175дн.</div>
              <div class="tblitem tbldate">01.01-01.02.2020</div>
              <div class="tblitem tblname">Силоси металеві вентильовані уніфіковані типу СМВУ.110.12.К45.В12</div>
              <div class="tblitem tblnumber">2311714</div>
              <div class="tblitem tblquantity">60000</div>
              <div class="tblitem tblnumofficenotes">2604191, 2604191, 2604193, 2604193</div>
              <div class="tblitem officenote">0дн.</div>
              <div class="tblitem picking">-1дн.</div>
              <div class="tblitem shipping">-12дн.</div>
              <div class="tblitem designer">-22дн.</div>
              <div class="tblitem drawingchanges">0дн.</div>
            </v-flex>
          </v-layout>

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
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.tbl > .tblitem {
  margin-right: 0px;
  padding: 0px 6px 0px 6px;
}

.tbl > .tblstatus {
  width: 4%;
  min-width: 55px;
  text-align: right;
  background-color: #f2f2f2;
}
.tbl > .tbldate {
  width: 8%;
  min-width: 130px;
  text-align: right;
  background-color: #d9d9d9;
}
.tbl > .tblname {
  width: 43%;
  min-width: 500px;
  text-align: left;
  background-color: #f2f2f2;
}
.tbl > .tblnumber {
  width: 5%;
  min-width: 75px;
  text-align: center;
  background-color: #f2f2f2;
  color: #203516;
  font-weight: bold;
}
.tbl > .tblquantity {
  width: 5%;
  min-width: 60px;
  text-align: center;
  background-color: #f2f2f2;
  color: #550000;
}
.tbl > .tblnumofficenotes {
  width: 15%;
  min-width: 260px;
  text-align: left;
  background-color: #f2f2f2;
}
/* Стили для дат */
.tbl > .officenote {
  width: 4%;
  min-width: 55px;
  text-align: left;
  background-color: #fff2cc;
}
.tbl > .picking {
  width: 4%;
  min-width: 55px;
  text-align: left;
  background-color: #ecefe9;
}
.tbl > .shipping {
  width: 4%;
  min-width: 55px;
  text-align: left;
  background-color: #f5e9ed;
}
.tbl > .designer {
  width: 4%;
  min-width: 55px;
  text-align: left;
  background-color: #e6ebf2;
}
.tbl > .drawingchanges {
  width: 4%;
  min-width: 55px;
  text-align: left;
  background-color: #d2d7e6;
}
.tbl > .hed {
  text-align: center;
  background-color: #fff;
  border-bottom: 1px solid #000;
  border-top: 1px solid #000;
  font-weight: bold;
}
</style>
