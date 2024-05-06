<script setup lang="ts">
import { parseCookieString } from '@/lib/utils'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { ref } from 'vue'
import FormElement from '../form/form-element.vue'

defineProps<{
  state: boolean
}>()
const emit = defineEmits(['update:cookie', 'update:state'])

const codeInput = ref('')

function importCookie(e: Event) {
  e.preventDefault()
  const attributes = parseCookieString(codeInput.value)
  emit('update:state', false)
  emit('update:cookie', attributes)
}
</script>

<template>
  <Dialog
    dismissableMask
    v-model:visible="$props.state"
    @update:visible="$emit('update:state', $event)"
    header="Upload Cookie"
    class="min-w-96 max-w-screen-sm w-full"
    :draggable="false"
    modal
  >
    <form class="flex flex-col justify-start gap-1" @submit="importCookie">
      <FormElement label="Cooke Code">
        <InputText
          id="name"
          type="text"
          v-model="codeInput"
          class="placeholder:truncate"
          :placeholder="`document.cookie = 'Cookie=Value; Path=/; Expires=${new Date().toUTCString()}; Secure; SameSite=Lax;'`"
          required
        />
      </FormElement>
      <Button icon="pi pi-upload" class="ml-auto mt-4" type="submit" label="Upload"></Button>
    </form>
  </Dialog>
</template>
