
import Vue from 'vue'
import moment from 'moment'

Vue.filter('dateFilter', function (value) {

    return moment(new Date(value)).format('ddd, DD MMM YYYY')
})