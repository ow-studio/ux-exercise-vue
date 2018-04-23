import Vue from 'vue';

import { starWarsResource } from 'src/util/resources';
import template from './person.html';

export default Vue.extend({
  template,

  data() {
    return {
      person: {}
    };
  },

  created(){
    this.fetchPost();
  },

  methods: {
    fetchPost(){
      const id = this.$route.params.id;

      return starWarsResource.get(`people/${id}`)
        .then((response) => {
          this.person = response.data;
        })
        .catch((errorResponse) => {
          // Handle error...
          console.log('API responded with:', errorResponse);
        });
    }
  }
});
