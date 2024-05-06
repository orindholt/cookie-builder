<script setup lang="ts">
import type { Cookie } from '@/lib/types'
import { cookieToString } from '@/lib/utils'
import Message from 'primevue/message'
import { computed } from 'vue'
import CodeBlock from './code-block.vue'

const { cookie } = defineProps<{
  cookie: Cookie
}>()

const code = computed(() => ({
  js: {
    code: cookieToString(cookie, {
      prefix: 'document.cookie = '
    }),
    striped: cookieToString(cookie, {
      prefix: 'document.cookie = ',
      strip: true
    })
  },
  http: {
    code: cookieToString(cookie, {
      prefix: 'Set-Cookie: ',
      semiColon: false
    }),
    striped: cookieToString(cookie, {
      prefix: 'Set-Cookie: ',
      strip: true,
      semiColon: false
    })
  }
}))

const warnings = computed(() =>
  [
    {
      cond: !cookie.name || !cookie.value,
      text: 'Your cookie should have a name and a value'
    },
    {
      cond: !cookie.expires && !cookie.maxAge && !cookie.expire,
      text: 'Your cookie should have either a expiration or max age'
    }
  ].filter((w) => w.cond)
)
</script>

<template>
  <div class="flex flex-col-reverse lg:flex-col gap-4">
    <CodeBlock
      label="Javascript (Browser)"
      :code="code.js.code"
      copyable
      :copyText="code.js.striped"
    />
    <CodeBlock label="HTTP Header" :code="code.http.code" copyable :copyText="code.http.striped" />
    <Message v-for="(warning, index) in warnings" :key="index" severity="warn">
      {{ warning.text }}
    </Message>
  </div>
</template>
