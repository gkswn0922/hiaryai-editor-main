import { onMounted, onUnmounted, ref, Ref } from 'vue'
import { toast } from 'vue-sonner'
import { API } from '@/lib/api'

export const useImageUploader = ({ onUpload }: { onUpload: (url: string) => void }): { loading: Ref<boolean>, uploadFile: (file: File) => Promise<void> } => {
  const loading = ref(false)

  const uploadFile = async (file: File) => {
    loading.value = true
    try {
      // Pass the actual file to the API
      const url = await API.uploadImage(file)
      onUpload(url)
      toast.success('이미지가 성공적으로 업로드되었습니다!')
    } catch (errPayload: any) {
      const error = errPayload?.response?.data?.error || '이미지 업로드에 실패했습니다'
      toast.error(error)
    }
    loading.value = false
  }

  return { loading, uploadFile }
}

export const useImageUpload = (): { ref: Ref<HTMLInputElement | null>, handleUploadClick: () => void } => {
  const fileInput = ref<HTMLInputElement | null>(null)

  const handleUploadClick = () => {
    fileInput.value?.click()
  }

  return { ref: fileInput, handleUploadClick }
}

export const useImageDropzone = ({ uploader }: { uploader: (file: File) => void }): {
  isDragging: Ref<boolean>,
  draggedInside: Ref<boolean>,
  onDragEnter: () => void,
  onDragLeave: () => void,
  onDrop: (e: DragEvent) => void
} => {
  const isDragging = ref<boolean>(false)
  const draggedInside = ref<boolean>(false)

  const dragStartHandler = () => {
    isDragging.value = true
  }

  const dragEndHandler = () => {
    isDragging.value = false
  }

  onMounted(() => {
    document.body.addEventListener('dragstart', dragStartHandler)
    document.body.addEventListener('dragend', dragEndHandler)
  })

  onUnmounted(() => {
    document.body.removeEventListener('dragstart', dragStartHandler)
    document.body.removeEventListener('dragend', dragEndHandler)
  })

  const onDrop = (e: DragEvent) => {
    draggedInside.value = false
    if (e.dataTransfer?.files.length === 0) {
      return
    }

    const fileList = e.dataTransfer!.files

    const files: File[] = []

    for (let i = 0; i < fileList.length; i += 1) {
      const item = fileList.item(i)
      if (item) {
        files.push(item)
      }
    }

    if (files.some(file => file.type.indexOf('image') === -1)) {
      return
    }

    e.preventDefault()

    const filteredFiles = files.filter(f => f.type.indexOf('image') !== -1)

    const file = filteredFiles.length > 0 ? filteredFiles[0] : undefined

    if (file) {
      uploader(file)
    }
  }

  const onDragEnter = () => {
    draggedInside.value = true
  }

  const onDragLeave = () => {
    draggedInside.value = false
  }

  return { isDragging, draggedInside, onDragEnter, onDragLeave, onDrop }
}
