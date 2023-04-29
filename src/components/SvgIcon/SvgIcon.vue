<script setup lang="ts" name="SvgIcon">
interface Props {
  name: string
  perfix: string
}

const props = withDefaults(defineProps<Props>(), {
  perfix: 'icon',
})
const symbol = computed(() => `#${props.perfix}-${props.name}`)
</script>

<template>
  <svg class="w-[1em] h-[1em] align-[-0.15em] fill-current overflow-hidden" aria-hidden="true">
    <use :xlink:href="symbol" />
  </svg>
</template>
