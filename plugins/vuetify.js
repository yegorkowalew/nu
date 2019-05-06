import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: "#f44336",
    accent: colors.grey.darken3,
    secondary: colors.amber.darken3,
    info: "#424242",
    warning: colors.amber.base,
    error: colors.deepOrange.accent4,
    success: colors.green.accent3,
    // цвета статуса заказов
    notproduced: colors.teal.lighten3,
    ready:colors.green.accent4,
    overdue:colors.red.lighten1,
    lesstendays:colors.orange.lighten1,
    moretendays:colors.lightBlue.darken1,
  }
})
