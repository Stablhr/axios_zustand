import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const GROUPS_KEY = 'todo.groups.v1'
const TASKS_KEY = 'todo.tasks.v1'
const STORE_KEY = 'todo-store'

const DEFAULT_GROUPS = [
  { id: 'school-activities', name: 'School Activities' },
  { id: 'personal-tasks', name: 'Personal Tasks' },
  { id: 'projects', name: 'Projects' },
  { id: 'daily-tasks', name: 'Daily Tasks' },
]

function isGroup(value) {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof value.id === 'string' &&
    value.id.trim() !== '' &&
    typeof value.name === 'string' &&
    value.name.trim() !== ''
  )
}

function isTask(value) {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof value.text === 'string' &&
    value.text.trim() !== ''
  )
}

function readLegacyGroups() {
  try {
    const raw = window.localStorage.getItem(GROUPS_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return null
    const groups = parsed
      .filter(isGroup)
      .map((group) => ({ id: group.id.trim(), name: group.name.trim() }))
    return groups.length ? groups : null
  } catch {
    return null
  }
}

function readLegacyTasks() {
  try {
    const raw = window.localStorage.getItem(TASKS_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return null
    return parsed
      .filter(isTask)
      .map((task, index) => ({
        id:
          typeof task.id === 'number' || typeof task.id === 'string'
            ? task.id
            : index,
        groupId:
          typeof task.groupId === 'string' && task.groupId.trim() !== ''
            ? task.groupId.trim()
            : 'daily-tasks',
        text: task.text,
        done: task.done === true,
      }))
  } catch {
    return null
  }
}

function getInitialState() {
  try {
    // If the new store already exists, let persist hydrate it instead.
    if (window.localStorage.getItem(STORE_KEY)) {
      return { groups: DEFAULT_GROUPS, tasks: [] }
    }
    const legacyGroups = readLegacyGroups()
    const legacyTasks = readLegacyTasks()
    return {
      groups: legacyGroups ?? DEFAULT_GROUPS,
      tasks: legacyTasks ?? [],
    }
  } catch {
    return { groups: DEFAULT_GROUPS, tasks: [] }
  }
}

const initialState = getInitialState()

function newId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const useTaskStore = create(
  persist(
    (set, get) => ({
      groups: initialState.groups,
      tasks: initialState.tasks,

      addGroup(name) {
        const trimmed = (name || '').trim()
        if (!trimmed) {
          return { ok: false, error: 'Category name cannot be empty.' }
        }
        const duplicate = get().groups.some(
          (group) => group.name.trim().toLowerCase() === trimmed.toLowerCase(),
        )
        if (duplicate) {
          return { ok: false, error: 'A category with that name already exists.' }
        }
        const base = slugify(trimmed) || 'group'
        let id = base
        const existing = new Set(get().groups.map((group) => group.id))
        let counter = 2
        while (existing.has(id)) {
          id = `${base}-${counter}`
          counter += 1
        }
        set((state) => ({
          groups: [...state.groups, { id, name: trimmed }],
        }))
        return { ok: true, error: null }
      },

      deleteGroup(groupId) {
        set((state) => ({
          groups: state.groups.filter((group) => group.id !== groupId),
          tasks: state.tasks.filter((task) => task.groupId !== groupId),
        }))
      },

      addTask(groupId, text) {
        const trimmed = (text || '').trim()
        if (!trimmed) {
          return { ok: false, error: 'Task text cannot be empty.' }
        }
        set((state) => ({
          tasks: [
            ...state.tasks,
            { id: newId(), groupId, text: trimmed, done: false },
          ],
        }))
        return { ok: true, error: null }
      },

      toggleTask(taskId) {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, done: !task.done } : task,
          ),
        }))
      },

      deleteTask(taskId) {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        }))
      },

      clearGroupTasks(groupId) {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.groupId !== groupId),
        }))
      },

      clearAllTasks() {
        set({ tasks: [] })
      },
    }),
    {
      name: STORE_KEY,
      storage: createJSONStorage(() => localStorage),
    },
  ),
)