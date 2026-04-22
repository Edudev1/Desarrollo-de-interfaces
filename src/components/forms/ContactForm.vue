<script setup>
import { ref } from 'vue'
import { sendContactForm } from '../../services/contactService'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const submitted = ref(false)
const sentData = ref(null)

async function handleSubmit() {
  const response = await sendContactForm(form.value)
  sentData.value = response.data
  submitted.value = true
}
</script>

<template>
  <div>
    <v-form @submit.prevent="handleSubmit">
      <v-text-field v-model="form.name" label="Nombre" variant="outlined" class="mb-4" />
      <v-text-field v-model="form.email" label="Email" variant="outlined" class="mb-4" />
      <v-text-field v-model="form.subject" label="Asunto" variant="outlined" class="mb-4" />
      <v-textarea v-model="form.message" label="Mensaje" variant="outlined" class="mb-4" />

      <v-btn type="submit" color="primary" size="large">
        Enviar
      </v-btn>
    </v-form>

    <v-card v-if="submitted" class="mt-6 pa-4" rounded="xl" elevation="2">
      <h3>Datos enviados</h3>
      <p><strong>Nombre:</strong> {{ sentData.name }}</p>
      <p><strong>Email:</strong> {{ sentData.email }}</p>
      <p><strong>Asunto:</strong> {{ sentData.subject }}</p>
      <p><strong>Mensaje:</strong> {{ sentData.message }}</p>
    </v-card>
  </div>
</template>