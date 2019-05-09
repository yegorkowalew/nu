<template>
  <v-layout row wrap>
    <v-flex xs12>
      <tblitem :itid="6851"></tblitem>
    </v-flex>
  </v-layout>
</template>
<script>
import tblitem from "~/components/Tableitem.vue";

export default {
  components: { tblitem },

  data() {
    return {};
  }
};
</script>
<style>
table.v-table tbody td {
  font-size: 14px;
  height: 12px;
}
table.v-table thead td:not(:nth-child(1)),
table.v-table tbody td:not(:nth-child(1)),
table.v-table thead th:not(:nth-child(1)),
table.v-table tbody th:not(:nth-child(1)),
table.v-table thead td:first-child,
table.v-table tbody td:first-child,
table.v-table thead th:first-child,
table.v-table tbody th:first-child {
  padding-right: 0px;
  padding-left: 10px;
}
.lines {
  /* background-color: beige; */
  white-space: nowrap; /* Запрещаем перенос строк */
  /* overflow: hidden; Обрезаем все, что не помещается в область */
  /* text-overflow: ellipsis; Добавляем многоточие */
}
</style>
