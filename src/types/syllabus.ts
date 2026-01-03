export type TranslationStatus = 'complete' | 'in_progress' | 'none'

export interface Reading {
  title: string
  url: string
  krSlug?: string
  translationStatus?: TranslationStatus // 명시하지 않으면 krSlug 유무로 판단
}

export interface Assignment {
  title: string
  url?: string
  dueDate?: string
  description?: string
}

export interface AdditionalResource {
  title: string
  url: string
}

export interface Guest {
  name: string
  role: string
  company: string
  linkedIn?: string
  companyUrl?: string
}

export interface Lecture {
  day: string // "1차시", "2차시" 등 강의 순서
  title: string
  slidesUrl?: string
  krSlidesSlug?: string
  additionalResources?: AdditionalResource[]
  guest?: Guest
  coGuest?: Guest
}

export interface Week {
  number: number
  title: string
  titleKr: string
  topics: string[]
  readings: Reading[]
  assignments: Assignment[]
  lectures: Lecture[]
}

export interface FaqItem {
  question: string
  answer: string
}
