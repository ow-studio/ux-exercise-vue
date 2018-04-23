import Vue from 'vue';
import template from './home.html';
import readme from '../../../README.md'
import VueMarkdown from 'vue-markdown'

export default Vue.extend({
  template,
  components: {
    'vue-markdown': VueMarkdown
  },
  data() {
    return {
      readme
    }
  }
});
