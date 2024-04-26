<script setup lang="ts">
import type { Cookie } from '@/lib/types'

defineProps<{
  selected: Cookie
}>()
</script>

<template>
  <code>
    document.cookie = '{{ selected.name }}={{ selected.value }}; Path={{ selected.path }}';
    Expires={{ selected.expires.toUTCString() }}; Domain={{ selected.domain }}; Secure={{
      selected.secure
    }}; HttpOnly={{ selected.httpOnly }}; SameSite={{ selected.sameSite }}'
  </code>
</template>
