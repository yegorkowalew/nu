<template>
  <v-layout>
    <v-card class="v-card-no-shadow mcard" color="#fff2cc" light max-width="400">
      <v-card-title>
        <span class="title font-weight-light">Служебная записка</span>
      </v-card-title>
      <v-list dense>
        <v-list-tile>
          <v-list-tile-content>Получение:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ posts.officenoteplan | formatDate }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Факт:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ posts.officenotefact | formatDate }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Разница:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ posts.officenoteexpired | formatDn }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>

    <v-card class="v-card-no-shadow mcard" color="#ecefe9" light max-width="400">
      <v-card-title>
        <span class="title font-weight-light">Комплектовочные</span>
      </v-card-title>
      <v-list dense>
        <v-list-tile>
          <v-list-tile-content>Получение:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ posts.pickingplan | formatDate }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Факт:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ posts.pickingfact | formatDate }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Разница:</v-list-tile-content>
          <v-list-tile-content class="align-end">-1дн</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>

    <v-card class="v-card-no-shadow mcard" color="#f5e9ed" light max-width="400">
      <v-card-title>
        <span class="title font-weight-light">Отгрузочные</span>
      </v-card-title>
      <v-list dense>
        <v-list-tile>
          <v-list-tile-content>Получение:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ posts.shippingplan | formatDate }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Факт:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ posts.shippingfact | formatDate }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Разница:</v-list-tile-content>
          <v-list-tile-content class="align-end">-1дн</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>

    <v-card class="v-card-no-shadow mcard" color="#e6ebf2" light max-width="400">
      <v-card-title>
        <span class="title font-weight-light">Конструкторская</span>
      </v-card-title>
      <v-list dense>
        <v-list-tile>
          <v-list-tile-content>Получение:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ posts.engineeringplan | formatDate }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Факт:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ posts.engineeringfact | formatDate }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Разница:</v-list-tile-content>
          <v-list-tile-content class="align-end">-1дн</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>

    <v-card class="v-card-no-shadow mcard" color="#d2d7e6" light max-width="400">
      <v-card-title>
        <span class="title font-weight-light">Изменения чертежей</span>
      </v-card-title>
      <v-list dense>
        <v-list-tile>
          <v-list-tile-content>Получение:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ posts.drawingchangepercent | formatDate }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Факт:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ posts.drawingchangefact | formatDate }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Разница:</v-list-tile-content>
          <v-list-tile-content class="align-end">-1дн</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-layout>
</template>

<script>
import axios from "axios";
import moment from 'moment'
export default {
  props: ["itid"],
  filters: {
    formatDate: function(value) {
      if (value) {
        return moment(String(value)).format("DD.MM.YYYY");
      }
    },
    formatDn: function(value) {
      if (value != null) {
        return value.toString() + "дн.";
      }
    }
  },
  data() {
    return {
      posts: []
    };
  },
  created() {
    axios
      .get(`http://127.0.0.1:8000/api/dateorder/` + this.itid)
      .then(response => {
        // JSON responses are automatically parsed.
        this.posts = response.data;
        this.loading = false;
      })
      .catch(e => {
        this.errors.push(e);
      });
  }
};
</script>


<style>
.mcard {
  min-width: 20%;
  border-radius: 0px;
}
.title {
  font-size: 15px !important;
}

.v-card__title {
  padding: 6px 16px 0px;
  
}

.theme--light.v-list {
  background-color: transparent;
}

.v-list--dense .v-list__tile:not(.v-list__tile--avatar) {
  height: 22px;
}
.v-card-no-shadow {
  box-shadow:0px 0px 0px 0px rgba(0,0,0,0.0), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 0px 0px rgba(0,0,0,0.12);
}
</style>
