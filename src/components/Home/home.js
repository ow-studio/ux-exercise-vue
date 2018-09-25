import Vue from 'vue';
import template from './home.html';
import readme from '../../../README.md'
import VueMarkdown from 'vue-markdown'
import {
  HorizontalBar
} from "vue-chartjs";
import {
  starWarsResource
} from 'src/util/resources';

export default Vue.extend({
  template,
  extends: HorizontalBar,
  components: {
    'vue-markdown': VueMarkdown
  },
  data() {
    return {
      readme,
      people: this.fetchPeople(),
    }
  },
  mounted() {
    this.renderChart({
      type: "horizontalBar",
      data: {
        labels: this.people.then(result => result.map(person => Object.keys(person)[0])),
        datasets: [{
          backgroundColor: "#f99820",
          hoverBackgroundColor: "#09264a",
          data: this.people.then(result => result.map(person => person[Object.keys(person)[0]].height)),
        }, {
          backgroundColor: "#2081f9",
          hoverBackgroundColor: "#bbb",
          data: this.people.then(result => result.map(person => person[Object.keys(person)[0]].mass)),
        }]
      },
    });
  },
  methods: {
    fetchPeople() {
      return starWarsResource.get(`people`)
        .then((response) => {
          return response.data.results.map(person => ({
            [person.name]: {
              height: person.height,
              mass: person.mass,
            }
          }))
        })
        .catch((errorResponse) => {
          // Handle error...
          console.log('API responded with:', errorResponse);
        });
    },
  },
});
