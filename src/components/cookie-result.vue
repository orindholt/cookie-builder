<script setup lang="ts">
import type { Cookie } from '@/lib/types'
import VCodeBlock from '@wdns/vue-code-block'
import Message from 'primevue/message'
import { computed } from 'vue'
import CopyButton from './copy-button.vue'

const props = defineProps<{
  cookie: Cookie
}>()

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const code = computed(() => {
  const { name, value, expires, ...attributes } = props.cookie

  const attr = (name: string, value: any) => (name && value ? `${name}=${value};` : '')

  return `document.cookie = '
    ${attr(name, value)}
    ${attr('Expires', expires?.toUTCString())}
    ${Object.entries(attributes)
      .map(([key, value]) => attr(capitalize(key), value))
      .join('\n\t')}
';`.replace(/^\s*\n/gm, '')
})

const warnings = computed(() =>
  [
    {
      cond: !props.cookie.name || !props.cookie.value,
      text: 'Your cookie should have a name and a value'
    },
    {
      cond: !props.cookie.expires && !props.cookie.maxAge,
      text: 'Your cookie should have either a expiration or max age'
    }
  ].filter((w) => w.cond)
)
</script>

<template>
  <div class="flex flex-col-reverse lg:flex-col gap-4">
    <VCodeBlock
      class="rounded-sm shadow-md relative"
      :code="code"
      highlightjs
      lang="javascript"
      theme="atom-one-dark"
    >
      <template #copyButton>
        <CopyButton :text="code" />
      </template>
    </VCodeBlock>
    <Message v-for="(warning, index) in warnings" :key="index" severity="warn">
      {{ warning.text }}
    </Message>
  </div>
</template>
