import Vue from 'vue'

import './styles/quasar.scss'
import '@quasar/extras/material-icons/material-icons.css'
import { Quasar } from 'quasar'
import { Dialog, Notify, QDrawer } from 'quasar'

Vue.use(Quasar, {
  config: {},
  components: {
    /* not needed if importStrategy is not 'manual' */
    QDrawer
  },
  directives: {
    /* not needed if importStrategy is not 'manual' */
  },
  plugins: { Dialog, Notify },
  animations: {}
})
