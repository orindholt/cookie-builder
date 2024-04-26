<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Calendar from 'primevue/calendar'
import Checkbox from 'primevue/checkbox'
import Dropdown from 'primevue/dropdown'

import CookieResult from './cookie-result.vue'
import { ref } from 'vue'
import type { Cookie } from '@/lib/types'

const selected = ref<Cookie>({
  name: '',
  path: '/',
  value: '',
  domain: '',
  expires: new Date(),
  secure: false,
  httpOnly: false,
  sameSite: 'Lax'
})

const sameSiteOptions = ['Lax', 'Strict', 'None']
</script>

<template>
  <div class="space-y-8">
    <CookieResult :selected />
    <div
      class="grid grid-cols-[auto_1fr] items-center gap-4 bg-slate-100 border border-slate-300 p-4 max-w-screen-sm"
    >
      <label for="name" class="text-sm font-medium text-slate-900">Name</label>
      <InputText type="text" v-model="selected.name" id="name" placeholder="Name" />
      <label for="value" class="text-sm font-medium text-slate-900">Value</label>
      <InputText type="text" v-model="selected.value" placeholder="Value" />
      <label for="path" class="text-sm font-medium text-slate-900">Path</label>
      <InputText type="text" v-model="selected.path" placeholder="Path" />
      <label for="domain" class="text-sm font-medium text-slate-900">Domain</label>
      <InputText type="text" v-model="selected.domain" placeholder="Domain" />
      <label for="expires" class="text-sm font-medium text-slate-900">Expires</label>
      <Calendar
        v-model="selected.expires"
        id="expires"
        showIcon
        dateFormat="yy-mm-dd"
        placeholder="Expires"
      />
      <label class="text-sm font-medium text-slate-900"> Secure </label>
      <Checkbox v-model="selected.secure" :binary="true" />
      <label class="text-sm font-medium text-slate-900"> HttpOnly </label>
      <Checkbox v-model="selected.httpOnly" :binary="true" />
      <label for="sameSite" class="text-sm font-medium text-slate-900">SameSite</label>
      <Dropdown
        v-model="selected.sameSite"
        id="sameSite"
        :options="sameSiteOptions"
        placeholder="SameSite"
      />
    </div>
  </div>
</template>
