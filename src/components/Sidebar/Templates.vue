<template>
  <div class="mb-6">
    <div class="mb-2 text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400">
      템플릿
    </div>
    <div class="space-y-2">
      <button
        @click="insertStudyNoteTemplate"
        class="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      >
        <Icon name="BookOpen" class="w-5 h-5 text-blue-500" />
        <div>
          <div class="text-sm font-medium text-neutral-800 dark:text-neutral-200">학습 노트</div>
          <div class="text-xs text-neutral-500 dark:text-neutral-400">요약, 키포인트, 회고 템플릿</div>
        </div>
      </button>

      <button
        @click="insertMeetingTemplate"
        class="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      >
        <Icon name="Users" class="w-5 h-5 text-green-500" />
        <div>
          <div class="text-sm font-medium text-neutral-800 dark:text-neutral-200">회의록</div>
          <div class="text-xs text-neutral-500 dark:text-neutral-400">회의 목표, 내용, 액션 아이템</div>
        </div>
      </button>

      <button
        @click="insertProjectTemplate"
        class="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      >
        <Icon name="FolderOpen" class="w-5 h-5 text-purple-500" />
        <div>
          <div class="text-sm font-medium text-neutral-800 dark:text-neutral-200">프로젝트 계획</div>
          <div class="text-xs text-neutral-500 dark:text-neutral-400">목표, 일정, 리소스 템플릿</div>
        </div>
      </button>

      <button
        @click="insertDailyTemplate"
        class="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      >
        <Icon name="Calendar" class="w-5 h-5 text-orange-500" />
        <div>
          <div class="text-sm font-medium text-neutral-800 dark:text-neutral-200">일일 기록</div>
          <div class="text-xs text-neutral-500 dark:text-neutral-400">오늘의 목표, 성과, 회고</div>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import Icon from '@/components/ui/Icon.vue'

type TemplatesProps = {
  editor: Editor
}

const props = defineProps<TemplatesProps>()

const getCurrentDate = () => {
  return new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\./g, '/').replace(/ /g, '').slice(0, -1)
}

const insertStudyNoteTemplate = () => {
  const template = `
# 요약

## 날짜
${getCurrentDate()}

## 태그


## 키포인트
-
-
-

## 회고


## 다음 학습

`

  props.editor.chain().focus().insertContent(template).run()
}

const insertMeetingTemplate = () => {
  const template = `
# 회의록

## 기본 정보
- **날짜**: ${getCurrentDate()}
- **참석자**:
- **회의 시간**:

## 회의 목표


## 논의 내용


## 결정 사항


## 액션 아이템
- [ ]
- [ ]
- [ ]

## 다음 회의

`

  props.editor.chain().focus().insertContent(template).run()
}

const insertProjectTemplate = () => {
  const template = `
# 프로젝트 계획

## 프로젝트 개요
- **프로젝트명**:
- **시작일**: ${getCurrentDate()}
- **예상 완료일**:
- **담당자**:

## 목표


## 주요 마일스톤
- [ ]
- [ ]
- [ ]

## 리소스
### 인력

### 도구/기술

### 예산

## 위험 요소


## 성공 지표

`

  props.editor.chain().focus().insertContent(template).run()
}

const insertDailyTemplate = () => {
  const template = `
# ${getCurrentDate()} 일일 기록

## 오늘의 목표
- [ ]
- [ ]
- [ ]

## 주요 성과


## 배운 점


## 어려웠던 점


## 내일 계획
- [ ]
- [ ]
- [ ]

## 기분/컨디션
⭐ / 5

## 메모

`

  props.editor.chain().focus().insertContent(template).run()
}
</script>
