<script setup lang="ts">
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

async function copyText(text: string) {
  // Failsafe for incompatiable browsers - Copying fails first time for specific browsers
  let retry = 0

  if (retry < 3) {
    try {
      await navigator.clipboard.writeText(text)
      toast.add({
        severity: 'success',
        summary: 'Copied',
        detail: 'The text has been copied to your clipboard',
        life: 2000
      })
    } catch (error) {
      copyText(text)
      retry++
    }
  } else {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'An error occurred while copying the text to your clipboard',
      life: 2000
    })
  }
}

defineProps<{
  text: string
}>()
</script>

<template>
  <Toast position="bottom-right" />
  <button
    type="button"
    @click="copyText(text.replace(/(\r\n|\n|\r|\t|\s{2,})/gm, '').replace(/;(?=[^;\s|'])/g, '; '))"
    class="flex lg:hover:text-primary-600 transition-colors"
    v-bind="$attrs"
  >
    <i class="pi pi-clipboard"></i>
  </button>
</template>
