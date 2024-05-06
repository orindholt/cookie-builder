<script setup lang="ts">
import VCodeBlock from '@wdns/vue-code-block'
import CopyButton from './copy-button.vue'

defineProps<{
  code: string
  copyable?: boolean
  copyText?: string
  label?: string
}>()
</script>

<template>
  <VCodeBlock
    :label="$props.label"
    class="rounded-sm shadow-md"
    :code="$props.code"
    highlightjs
    lang="javascript"
    theme="atom-one-dark"
  >
    <template v-if="$props.copyable" #copyButton>
      <CopyButton
        successMessage="Your cookie has been copied"
        class="!py-0 !px-2 !w-fit"
        :value="$props.copyText || $props.code"
        text
      />
    </template>
  </VCodeBlock>
</template>
