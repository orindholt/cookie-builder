<script setup lang="ts">
import type { Cookie } from '@/lib/types'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import SplitButton from 'primevue/splitbutton'
import Toolbar from 'primevue/toolbar'
import { ref } from 'vue'
import FormElement from './form/form-element.vue'
import { DEFAULT_COOKIE } from '@/lib/constants'
import { useConfirm } from 'primevue/useconfirm'
import ConfirmDialog from 'primevue/confirmdialog'

defineProps<{
  cookie: Cookie
}>()
const emit = defineEmits(['update-cookie'])

const uploadVisible = ref(false)
const cookieInput = ref('')

function saveCookie() {
  console.log('Save Cookie')
}

function isValidDate(dateStr: string): boolean {
  const date = new Date(dateStr)
  return !isNaN(date.getTime())
}

function importCookie(e: Event) {
  e.preventDefault()
  const attributes = cookieInput.value
    .replace(/document\.*cookie\s*=|'/g, '')
    .split(';')
    .map((c) => c.trim())
    .filter(Boolean)

  let nameValue = false

  const reduced = attributes.reduce(
    (acc, c) => {
      let [key, value] = c.split('=') as [string, any]
      key = key.toLowerCase()

      if (isValidDate(value)) value = new Date(value)
      else if (value === 'true') value = true
      else if (value === 'false') value = false
      else if (!isNaN(value)) value = Number(value)

      if (key in DEFAULT_COOKIE) {
        acc[key] = value
      } else if (!nameValue) {
        nameValue = true
        acc.name = key
        acc.value = value
      }
      return acc
    },
    {} as Record<string, any>
  )
  uploadVisible.value = false
  emit('update-cookie', reduced)
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
    accept: () => {
      console.log('Reset Cookie', DEFAULT_COOKIE)
      emit('update-cookie', DEFAULT_COOKIE)
    }
  })
  // Object.assign(cookie, DEFAULT_COOKIE)
}

const items = [
  { label: 'Save As', icon: 'pi pi-plus' },
  { label: 'Copy', icon: 'pi pi-clipboard' },
  { label: 'Upload', icon: 'pi pi-upload', command: () => (uploadVisible.value = true) }
]
</script>

<template>
  <ConfirmDialog :draggable="false" />
  <Dialog
    v-model:visible="uploadVisible"
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
          v-model="cookieInput"
          class="placeholder:truncate"
          :placeholder="`document.cookie = 'Cookie=Value; Path=/; Expires=${new Date().toUTCString()}; Secure; SameSite=Lax;'`"
          required
        />
      </FormElement>
      <Button icon="pi pi-upload" class="ml-auto mt-4" type="submit" label="Upload"></Button>
    </form>
  </Dialog>
  <Toolbar>
    <template #start>
      <Button icon="pi pi-plus" class="mr-2" severity="secondary"></Button>
      <Button icon="pi pi-clipboard" class="mr-2" severity="secondary"></Button>
      <Button
        icon="pi pi-upload"
        class="mr-2"
        severity="secondary"
        @click="uploadVisible = true"
      ></Button>
      <Button icon="pi pi-trash" class="mr-2" severity="secondary" @click="resetCookie"></Button>
    </template>
    <template #end>
      <SplitButton label="Save" :model="items" @click="saveCookie" />
    </template>
  </Toolbar>
</template>
