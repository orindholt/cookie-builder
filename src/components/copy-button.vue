<script setup lang="ts">
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { copyString } from '@/lib/utils'
import Button from 'primevue/button'

const props = defineProps<{
  value: string
  successMessage?: string
  errorMessage?: string
}>()

const toast = useToast()

async function onCopy() {
  copyString({
    text: props.value,
    onSuccess: () => {
      toast.add({
        severity: 'success',
        summary: 'Copied',
        detail: props.successMessage || 'The text has been copied to your clipboard',
        life: 2000
      })
    },
    onError: () => {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: props.errorMessage || 'An error occurred while copying the text to your clipboard',
        life: 2000
      })
    }
  })
}
</script>

<template>
  <Toast position="bottom-right" />
  <Button @click="onCopy" v-bind="$attrs" icon="pi pi-clipboard"></Button>
</template>
