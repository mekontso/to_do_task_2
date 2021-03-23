<template>

    <v-snackbar
        transition="scroll-y-transition"
        right
        top
        :color="snackData.color"
        v-model="snackData.view">
        <v-alert type="success" v-if="snackData.color === 'success'" >
            {{snackData.text}}
        </v-alert>
        <v-alert type="warning" v-if="snackData.color === 'warning'" >
            {{snackData.text}}
        </v-alert>
        <v-alert type="error" v-if="snackData.color === 'error'" >
            {{snackData.text}}
        </v-alert>

        <template v-slot:action="{ attrs }">
            <v-btn
                color="black"
                text
                v-bind="attrs"
                @click="$store.commit('closeSnackbar')"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </template>
    </v-snackbar>

</template>

<script>

export default {
    name: "CustomSnackbar",
    computed: {
        snackData(){
            return this.$store.getters.getSnackData
        }
    }

}
</script>

<style scoped>

</style>
