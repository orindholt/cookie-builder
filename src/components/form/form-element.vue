<script setup lang="ts">
defineProps<{
  label: string
  id: string
  tooltip: string
}>()
</script>

<template>
  <label v-tooltip="tooltip" :for="id" class="text-sm font-medium text-slate-900">
    {{ label }}
  </label>
  <slot :id="id" v-bind="$attrs"></slot>
</template>
