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
      <v-data-table 
      :headers="headers" 
      :items="computedData" 
      :expand="expand" 
      item-key="ordernum"
      :loading="loading"
      hide-actions >
        <template v-slot:items="props">
          <tr @click="props.expanded = !props.expanded">
            <td class="text-xs-right" v-if="props.item.status === 'ready'" :class="props.item.status+'--text'">Готов</td>
            <td class="text-xs-right" v-else-if="props.item.status === 'notproduced'" :class="props.item.status+'--text'">Н/П</td>
            <td class="text-xs-right" v-else :class="props.item.status+'--text'">{{ props.item.statusdata }}дн.</td>
            <td class="lines text-xs-right">{{ props.item.dates }}</td>
            <td>{{ props.item.product }}</td>
            <td>{{ props.item.customer }}</td>
            <td>{{ props.item.ordernum }}</td>
            <td>{{ props.item.quantity }}</td>
            <td>{{ props.item.firstofficenote }}</td>
          </tr>
        </template>
        <template v-slot:expand="props">
          <tblitem :itid="props.item.id"></tblitem>
        </template>
        <v-progress-linear v-slot:progress color="primary" indeterminate></v-progress-linear>
        <template v-slot:no-data>
          <v-alert :value="true" color="secondary" icon="warning">{{tableAllertMessage}}
            <ul v-if="errors">
              <li v-for="(error, index) of errors" :key="index">
                {{error.message}}
              </li>
            </ul>
          </v-alert>
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
import tblitem from "~/components/Tableitem.vue";
export default {
  components: {tblitem, },
    data() {
      return {
      tableAllertMessage:'',
      defaulttableAllertMessage:'Извините, нет ничего для отображения',
      notproducedIsActive: false,
      readyIsActive: false,
      overdueIsActive: true,
      lesstendaysIsActive: true,
      moretendaysIsActive: true,
      expand: false,
      loading: true,
      posts: [],
      errors: [],
      headers: [
        { text: "Статус", value: "statusdata", sortable: false },
        { text: "Отправка", value: "dates", align: "left", sortable: false},
        { text: "Продукция", value: "product", sortable: false },
        { text: "Контрагент", value: "customer", sortable: false },
        { text: "№ Заказа", value: "ordernum", sortable: false },
        { text: "Кол-во", value: "quantity", sortable: false },
        { text: "СЗ", value: "firstofficenote", sortable: false },
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
      return this.posts.filter(i => filtered.includes(i.status));
      // return this.posts
    }
  },
  methods: {
    async fetchPostsData() {
      this.tableAllertMessage = 'Загрузка...';
      const postsdata = await this.$axios.$get(`${this.$axios.defaults.baseURL}dateorder/`).then((response) => {
        this.posts = response;
        this.loading = false;
        this.tableAllertMessage = this.defaulttableAllertMessage;
      }).catch(e => {
      this.errors.push(e);
      this.tableAllertMessage = 'Извините, возникли ошибки:';
      this.loading = false;
    })
    }
  },
  created() {
    this.fetchPostsData()
  }
};
</script>
<style>
table.v-table tbody td {
  font-size: 14px;
  height: 12px;
}
table.v-table thead td:not(:nth-child(1)), table.v-table tbody td:not(:nth-child(1)), table.v-table thead th:not(:nth-child(1)), table.v-table tbody th:not(:nth-child(1)), table.v-table thead td:first-child, table.v-table tbody td:first-child, table.v-table thead th:first-child, table.v-table tbody th:first-child {
  padding-right: 0px;
  padding-left: 10px;
}
.lines {
    white-space: nowrap; /* Запрещаем перенос строк */
}
</style>
