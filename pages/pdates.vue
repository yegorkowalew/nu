<template>
  <v-layout row wrap>
    <v-layout xs12 mb-1 align-end justify-end>
      <v-btn
        small
        flat
        color="notproduced"
        :outline="notproducedIsActive"
        v-on:click="notproducedIsActive = !notproducedIsActive"
      >не производятся</v-btn>
      <v-btn
        small
        flat
        color="ready"
        :outline="readyIsActive"
        v-on:click="readyIsActive = !readyIsActive"
      >готовые</v-btn>
      <v-btn
        small
        flat
        color="overdue"
        :outline="overdueIsActive"
        v-on:click="overdueIsActive = !overdueIsActive"
      >просроченные</v-btn>
      <v-btn
        small
        flat
        color="lesstendays"
        :outline="lesstendaysIsActive"
        v-on:click="lesstendaysIsActive = !lesstendaysIsActive"
      >меньше 10 дней</v-btn>
      <v-btn
        small
        flat
        color="moretendays"
        :outline="moretendaysIsActive"
        v-on:click="moretendaysIsActive = !moretendaysIsActive"
      >больше 10 дней</v-btn>
    </v-layout>
    <v-flex xs12>
      <v-toolbar flat color="white">
        <v-toolbar-title>Отчет по датам</v-toolbar-title>
      </v-toolbar>
      <v-data-table :headers="headers" :items="computedData" :expand="expand" item-key="name" hide-actions >
        <template v-slot:items="props">
          <tr @click="props.expanded = !props.expanded">
            <td :class="props.item.status+'--text'">{{ props.item.statusdata }}</td>
            <td>{{ props.item.shipment }}</td>
            <td class="text-xs-right">{{ props.item.calories }}</td>
            <td class="text-xs-right">{{ props.item.fat }}</td>
            <td class="text-xs-right">{{ props.item.carbs }}</td>
            <td class="text-xs-right">{{ props.item.protein }}</td>
            <td class="text-xs-right">{{ props.item.iron }}</td>
          </tr>
        </template>
        <template v-slot:expand="props">
          <v-card flat>
            <v-card-text>Peek-a-boo!</v-card-text>
          </v-card>
        </template>
        <v-progress-linear v-slot:progress color="primary" indeterminate></v-progress-linear>
        <template v-slot:no-data>
          <v-alert :value="true" color="error" icon="warning">Извините, нет ничего для отображения.</v-alert>
        </template>
        <template v-slot:footer>
          <td :colspan="headers.length">
            <strong>Всего позиций: {{ computedDataLen }}</strong>
          </td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      notproducedIsActive: false,
      readyIsActive: false,
      overdueIsActive: true,
      lesstendaysIsActive: true,
      moretendaysIsActive: true,
      expand: false,
      info:[],
      headers: [
        { text: "Статус", value: "status", sortable: false },
        { text: "Отгрузка", value: "shipment", align: "left", sortable: false},
        { text: "Продукция", value: "calories", sortable: false },
        { text: "Контрагент", value: "fat", sortable: false },
        { text: "№ Заказа", value: "carbs", sortable: false },
        { text: "Кол-во", value: "protein", sortable: false },
        { text: "№№ СЗ", value: "iron", sortable: false }
      ],
      desserts: [
        {
          status: "notproduced",
          statusdata: "н/п",
          shipment: "23.02.2019",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%"
        },
        {
          status: "notproduced",
          statusdata: "н/п",
          shipment: "12.02.2018",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%"
        },
        {
          status: "ready",
          statusdata: "готов",
          shipment: "02.03.2019",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%"
        },
        {
          status: "ready",
          statusdata: "готов",
          shipment: "22.02.2019",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%"
        },
        {
          status: "overdue",
          statusdata: "-10",
          shipment: "25.05.2019",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%"
        },
        {
          status: "lesstendays",
          statusdata: "3",
          shipment: "30.12.2019",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%"
        },
        {
          status: "moretendays",
          statusdata: "23",
          shipment: "12.12.2019",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%"
        },
        {
          status: "lesstendays",
          statusdata: "5",
          shipment: "02.03.2019",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%"
        },
        {
          status: "moretendays",
          statusdata: "55",
          shipment: "15.06.2019",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%"
        },
        {
          status: "overdue",
          statusdata: "-7",
          shipment: "08.08.2019",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%"
        },
        {
          status: "overdue",
          statusdata: "-10",
          shipment: "05.05.2019",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%"
        },
        {
          status: "lesstendays",
          statusdata: "3",
          shipment: "02.07.2018",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%"
        },
        {
          status: "moretendays",
          statusdata: "23",
          shipment: "20.20.2019",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%"
        },
        {
          status: "lesstendays",
          statusdata: "5",
          shipment: "Honeycomb 5",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%"
        },
        {
          status: "moretendays",
          statusdata: "55",
          shipment: "Donut 23",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%"
        },
        {
          status: "overdue",
          statusdata: "-7",
          shipment: "KitKat xs",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%"
        },
        {
          status: "notproduced",
          statusdata: "н/п",
          shipment: "Ice cream sandwich 12",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%"
        },
        {
          status: "ready",
          statusdata: "готов",
          shipment: "Eclair 162",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%"
        },
        {
          status: "ready",
          statusdata: "готов",
          shipment: "Cupcake 305",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%"
        },
        {
          status: "overdue",
          statusdata: "-10",
          shipment: "Gingerbread 356",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%"
        },
        {
          status: "lesstendays",
          statusdata: "3",
          shipment: "Jelly bean 35794",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%"
        },
        {
          status: "moretendays",
          statusdata: "23",
          shipment: "Lollipop 392",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%"
        },
        {
          status: "lesstendays",
          statusdata: "5",
          shipment: "Honeycomb 408",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%"
        },
        {
          status: "moretendays",
          statusdata: "55",
          shipment: "Donut 452",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%"
        },
        {
          status: "overdue",
          statusdata: "-7",
          shipment: "KitKat 518",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%"
        },
        {
          status: "overdue",
          statusdata: "-10",
          shipment: "Gingerbread 35610",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%"
        },
        {
          status: "lesstendays",
          statusdata: "3",
          shipment: "Jelly bean 357",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%"
        },
        {
          status: "moretendays",
          statusdata: "23",
          shipment: "Lollipop 39a2",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%"
        },
        {
          status: "lesstendays",
          statusdata: "5",
          shipment: "Honeycomb 4080",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%"
        },
        {
          status: "moretendays",
          statusdata: "55",
          shipment: "Donut 45255",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%"
        },
        {
          status: "overdue",
          statusdata: "-7",
          shipment: "KitKat1 518",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%"
        }
      ]
    };
  },
  computed: {
    computedDataLen: function(){
      return this.computedData.length
    },
    computedData: function() {
      const statusarray = [
        "notproduced",
        "ready",
        "overdue",
        "lesstendays",
        "moretendays"
      ];
      const filtered = statusarray.filter(status => this[status + "IsActive"]);
      return this.desserts.filter(i => filtered.includes(i.status));
    }
  },
  // mounted() {
  //   axios
  //     .get('http://127.0.0.1:8000/api/orders/')
  //     .then(response => (this.info = response)),
  //     console.log(this.info)
  // }
};
</script>
<style>
table.v-table tbody td {
  font-size: 14px;
  height: 12px;
}
</style>
