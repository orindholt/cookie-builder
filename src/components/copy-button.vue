<script setup lang="ts">
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

function copyText(text: string) {
  toast.add({ severity: 'success', summary: 'Copied', life: 2000 })
  navigator.clipboard.writeText(text.replace(/\s+/g, ' '))
}

defineProps<{
  text: string
}>()
</script>

<template>
  <Toast position="bottom-right" />
  <button
    type="button"
    @click="copyText(text)"
    class="flex lg:hover:text-primary-600 transition-colors"
    v-bind="$attrs"
  >
    <i class="pi pi-clipboard"></i>
  </button>
</template>
