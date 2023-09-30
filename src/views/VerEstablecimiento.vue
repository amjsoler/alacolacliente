<template>
    <div class="row datos-establecimiento">
        <div class="col-4">
            <!--TODO-->
            <img src="http://localhost:8000/storage/noimage.jpg" class="img-fluid rounded-start" alt="logo">
        </div>
        <div class="col-8">
            <h1 class="text-center">{{ verEstablecimiento.nombre }}</h1>

            <div class="row">
                <div class="col-8">
                    <p><b>{{verEstablecimiento.direccion}}</b></p>
                </div>
                <div class="col-4">
                   Marcar/Desmarcar Favorito
                </div>
            </div>
        </div>
        <!-- TODO Textarea descripción -->
        <textarea v-model="verEstablecimiento.descripcion" v-if="verEstablecimiento.descripcion">

        </textarea>
    </div>
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