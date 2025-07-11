<template>
  <component :is="as" :class="buttonClasses">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:hover:bg-neutral-800 dark:hover:text-neutral-100 disabled:opacity-50 dark:focus:ring-neutral-400 disabled:pointer-events-none dark:focus:ring-offset-neutral-900 data-[state=open]:bg-neutral-100 dark:data-[state=open]:bg-neutral-800',
  {
    variants: {
      variant: {
        primary:
          'bg-black text-white hover:bg-neutral-700 dark:bg-white dark:text-black dark:hover:bg-neutral-200',
        secondary:
          'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-600',
        tertiary:
          'bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:text-neutral-100',
        ghost:
          'bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:text-neutral-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent',
        link: 'bg-transparent underline-offset-4 hover:underline text-neutral-900 dark:text-neutral-100 hover:bg-transparent dark:hover:bg-transparent',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-2 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  as?: string
  active?: boolean
  activeClassname?: string
}

const props = withDefaults(defineProps<ButtonProps>(), {
  as: 'button',
  variant: 'primary',
  size: 'default',
})

const buttonClasses = computed(() =>
  cn(
    buttonVariants({ variant: props.variant, size: props.size }),
    { [props.activeClassname || 'is-active']: props.active },
  ),
)
</script> 