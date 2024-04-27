<script setup lang="ts">
import type { Cookie } from '@/lib/types'
import Message from 'primevue/message'
import { computed } from 'vue'
import CopyButton from './copy-button.vue'

const props = defineProps<{
  cookie: Cookie
}>()

const cookie = computed(() => {
  const { name, value, path, expires, domain, secure, httpOnly, sameSite } = props.cookie

  return `document.cookie = '
    ${name && value ? `${name}=${value};` : ''}
    ${path ? `Path=${path};` : ''}
    ${expires ? `Expires=${expires.toUTCString()};` : ''}
    ${domain ? `Domain=${domain};` : ''}
    ${secure ? `Secure;` : ''}
    ${httpOnly ? `HttpOnly;` : ''}
    ${sameSite ? `SameSite=${sameSite};` : ''}
  '`
})

const showWarning = computed(() => !props.cookie.name || !props.cookie.value)
</script>

<template>
  <div>
    <div class="bg-slate-200 p-2 pr-8 rounded-sm border border-gray-400 relative">
      <code>
        {{ cookie }}
      </code>
      <CopyButton :text="cookie" class="absolute bottom-2 right-2" />
    </div>
    <Message severity="warn" v-if="showWarning">Your cookie needs a name and a value</Message>
  </div>
</template>
