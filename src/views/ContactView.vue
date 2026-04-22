<script setup>
import ContactForm from '../components/forms/ContactForm.vue'
</script>

<template>
  <v-container class="py-10">
    <p class="text-overline" style="color:#6D3BD9;">CONTACTO</p>
    <h1 class="text-h3 mb-6">Formulario de contacto</h1>

    <v-row>
      <v-col cols="12" md="8">
        <v-card rounded="xl" elevation="2" class="pa-6">
          <ContactForm />
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card rounded="xl" elevation="2" class="pa-6">
          <h3>Información</h3>
          <p>En esta vista recoges datos con Vuetify y muestras lo enviado debajo del formulario.</p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>