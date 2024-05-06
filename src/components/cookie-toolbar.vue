<script setup lang="ts">
import { DEFAULT_COOKIE } from '@/lib/constants'
import type { Cookie } from '@/lib/types'
import { cookieToString } from '@/lib/utils'
import Button from 'primevue/button'
import ConfirmDialog from 'primevue/confirmdialog'
import SplitButton from 'primevue/splitbutton'
import Toolbar from 'primevue/toolbar'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'
import CopyButton from './copy-button.vue'
import LoadDialog from './dialog/load-dialog.vue'

const props = defineProps<{
  cookie: Cookie
}>()
const emit = defineEmits(['update:cookie'])

const load = ref<boolean>(false)

const toast = useToast()

function saveCookie() {
  toast.add({ severity: 'success', summary: 'Success', detail: 'Cookie saved', life: 2000 })
  const stringified = JSON.stringify(props.cookie)
  localStorage.setItem('saved-cookie', stringified)
}

const confirm = useConfirm()

function resetCookie() {
  confirm.require({
    header: 'Reset Cookie',
    icon: 'pi pi-exclamation-triangle',
    message: 'Are you sure you want to reset the cookie?',
    acceptLabel: 'Reset',
    rejectClass: 'p-button-secondary p-button-outlined',
    acceptClass: 'p-button-danger',
    accept: () => emit('update:cookie', DEFAULT_COOKIE)
  })
}

const items = [{ label: 'Load', icon: 'pi pi-upload', command: () => (load.value = true) }]
</script>

<template>
  <ConfirmDialog dismissableMask :draggable="false" />
  <LoadDialog :state="load" @update:state="(b: boolean) => (load = b)" />
  <Toolbar>
    <template #start>
      <CopyButton :value="cookieToString($props.cookie)" class="mr-2" severity="secondary" />
      <Button icon="pi pi-upload" class="mr-2" severity="secondary" @click="load = true"></Button>
      <Button icon="pi pi-trash" class="mr-2" severity="secondary" @click="resetCookie"></Button>
    </template>
    <template #end>
      <SplitButton label="Save" :model="items" @click="saveCookie" />
    </template>
  </Toolbar>
</template>
