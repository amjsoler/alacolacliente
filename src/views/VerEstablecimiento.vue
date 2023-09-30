<template>
    Ver establecimiento {{ verEstablecimiento }}
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: "VerEstablecimiento",
    data() {
        return {
            establecimientoID: this.$route.params.id
        }
    },
    computed: {
        ...mapState({
            verEstablecimiento: state => state.establecimientos.verEstablecimiento
        })
    },
    methods: {
        ...mapActions({
            verEstablecimientoAction: "establecimientos/verEstablecimiento"
        })
    },
    mounted() {
        this.$store.dispatch("establecimientos/verEstablecimiento", this.establecimientoID);
    }
}
</script>