<script setup lang="ts">
import type { Cookie } from '@/lib/types'
import VCodeBlock from '@wdns/vue-code-block'
import Message from 'primevue/message'
import { computed } from 'vue'
import CopyButton from './copy-button.vue'
import { parseCookie } from '@/lib/utils'

const { cookie } = defineProps<{
  cookie: Cookie
}>()

const code = computed(() => parseCookie(cookie))

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
    <VCodeBlock
      class="rounded-sm shadow-md"
      :code="code"
      highlightjs
      lang="javascript"
      theme="atom-one-dark"
    >
      <template #copyButton>
        <CopyButton class="!py-0 !px-2 !w-fit" :value="code" text />
      </template>
    </VCodeBlock>
    <Message v-for="(warning, index) in warnings" :key="index" severity="warn">
      {{ warning.text }}
    </Message>
  </div>
</template>
