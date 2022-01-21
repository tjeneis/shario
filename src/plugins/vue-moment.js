import Vue from 'vue';
import moment from 'moment';
import VueMoment from 'vue-moment';
import 'moment/locale/nl';

moment.updateLocale('nl', {
  monthsShort: moment.monthsShort('-MMM-'),
  weekdaysShort: moment.weekdaysMin(),
});

Vue.use(VueMoment, {
  moment,
});
