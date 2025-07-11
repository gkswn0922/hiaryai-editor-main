<script setup lang="ts">
import { computed } from 'vue'
import Spinner from '../../../components/ui/Spinner.vue'
import { useImageDropzone, useImageUpload, useImageUploader } from './composables'
import Button from '../../../components/ui/Button/Button.vue'
import Icon from '../../../components/ui/Icon.vue'

interface Props {
  onUpload: (url: string) => void
}

const props = defineProps<Props>()

const { loading, uploadFile } = useImageUploader({ onUpload: props.onUpload })
const { ref: fileInput, handleUploadClick } = useImageUpload()
const { draggedInside, onDrop, onDragEnter, onDragLeave } = useImageDropzone({ uploader: uploadFile })

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files) {
    uploadFile(target.files[0])
  }
}

const wrapperClass = computed(() => [
  'flex flex-col items-center justify-center px-8 py-10 rounded-lg bg-opacity-80',
  { 'bg-neutral-100': draggedInside.value },
])
</script>

<template>
  <div v-if="loading" class="flex items-center justify-center p-8 rounded-lg min-h-[10rem] bg-opacity-80">
    <Spinner class="text-neutral-500" :size="1.5" />
  </div>
  <div
    v-else
    :class="wrapperClass"
    @drop.prevent="onDrop"
    @dragover.prevent="onDragEnter"
    @dragleave.prevent="onDragLeave"
    contenteditable="false"
  >
    <Icon name="Image" class="w-12 h-12 mb-4 text-black dark:text-white opacity-20" />
    <div class="flex flex-col items-center justify-center gap-2">
      <div class="text-sm font-medium text-center text-neutral-400 dark:text-neutral-500">
        {{ draggedInside ? 'Drop image here' : 'Drag and drop or' }}
      </div>
      <div>
        <Button :disabled="draggedInside" @click="handleUploadClick" variant="primary" button-size="small">
          <Icon name="Upload" />
          Upload an image
        </Button>
      </div>
    </div>
    <input
      class="w-0 h-0 overflow-hidden opacity-0"
      ref="fileInput"
      type="file"
      accept=".jpg,.jpeg,.png,.webp,.gif"
      @change="onFileChange"
    />
  </div>
</template> 