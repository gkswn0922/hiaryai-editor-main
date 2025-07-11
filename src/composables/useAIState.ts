import { ref } from 'vue'

export const useAIState = () => {
  const isAiLoading = ref(false)
  const aiError = ref<string | null>(null)

  const setIsAiLoading = (isLoading: boolean) => {
    isAiLoading.value = isLoading
  }

  const setAiError = (error: string | null) => {
    aiError.value = error
  }

  return {
    isAiLoading,
    aiError,
    setIsAiLoading,
    setAiError,
  }
} 