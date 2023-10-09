<template>
    <div>
        {{establecimientos}}
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "MisEstablecimientos",
    data() {
        return {
            establecimientos: []
        }
    },
    mounted() {
        axios.get(process.env.VUE_APP_API_BASE_URL+"establecimientos/favoritos")
            .then(response => {
                this.establecimientos = response.data;
            })
            .catch(error => {
                console.log(error);
            });
    }
}
</script>