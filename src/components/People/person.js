import Vue from 'vue';

import {
  starWarsResource
} from 'src/util/resources';
import template from './person.html';

export default Vue.extend({
    template,

    data() {
        return {
            person: {},
            vehicles: [],
        };
    },

    created() {
        this.fetchPost();
    },

    methods: {
        fetchPost() {
            const id = this.$route.params.id;

            return starWarsResource.get(`people/${id}`)
                .then((response) => {
                    this.person = response.data;
                    console.warn(response.data);
                    for (let vehicle of this.person.vehicles) {
                        this.fetchVehicle(vehicle);
                        // this.vehicles[vehicle.id] = this.fetchVehicle(vehicle.id);
                    }
                })
                .catch((errorResponse) => {
                    // Handle error...
                    console.log('API responded with:', errorResponse);
                });
        },
        fetchVehicle(url) {
            let split = url.split("/");
            let id = split[split.length - 2];

            return starWarsResource.get(`vehicles/${id}`)
                .then((response) => {
                    this.vehicles.push(response.data);
                })
                .catch((errorResponse) => {
                    // Handle error...
                    console.error("API responded with:", errorResponse);
                })
        }
    }
});
