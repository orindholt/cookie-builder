<script setup lang="ts">
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { copyString, stripCookieString } from '@/lib/utils'
import Button from 'primevue/button'

const props = defineProps<{
  value: string
}>()

const toast = useToast()

async function copyText() {
  copyString({
    text: stripCookieString(props.value),
    onSuccess: () => {
      toast.add({
        severity: 'success',
        summary: 'Copied',
        detail: 'The text has been copied to your clipboard',
        life: 2000
      })
    },
    onError: () => {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'An error occurred while copying the text to your clipboard',
        life: 2000
      })
    }
  })
}
</script>

<template>
  <Toast position="bottom-right" />
  <Button @click="copyText" v-bind="$attrs" icon="pi pi-clipboard"></Button>
</template>
