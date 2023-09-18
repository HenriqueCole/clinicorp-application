import { expect, test } from 'vitest'
import { blockTask, createTask, deleteTask, getTaskByDescription, getTaskById, unblockTask, updateTask } from './api/tasks/tasks.handler'

test('Check if the task creation succeeded', async () => {
  const task = await createTask({
    createdBy: 'Tarefa #teste',
    description: 'Criando tarefa de teste',
    isBlocked: false,
    priority: 'Baixo',
    responsible: 'Vite Doe',
    status: 'To do',
  })
  
  const taskByDescription = await getTaskByDescription('Criando tarefa de teste')
  const taskById = await getTaskById(taskByDescription.id)
  expect(taskById.description).toBe('Criando tarefa de teste')
})

test('Check if the task block succeeded', async () => {
  const taskByDescription = await getTaskByDescription('Criando tarefa de teste')
  const taskBlocked = await blockTask(taskByDescription.id)
  expect(taskBlocked.isBlocked).toBe(true)
})

test('Check if the task failed to update', async () => {
  const taskByDescription = await getTaskByDescription('Criando tarefa de teste')
  try {
    const taskUpdated = await updateTask(taskByDescription.id, {
      createdBy: 'Tarefa #teste',
      description: 'Criando tarefa de teste',
      isBlocked: false,
      priority: 'Baixo',
      responsible: 'Vite Doe',
      status: 'To do',
    })
  } catch (error) {
    expect(error.message).toBe('Task is blocked')
  }
})

test('Check if the task failed to be deleted', async () => {
  const taskByDescription = await getTaskByDescription('Criando tarefa de teste')
  try {
    const taskDeleted = await deleteTask(taskByDescription.id)
  } catch (error) {
    expect(error.message).toBe('Task is blocked')
  }
})

test('Check if the task unblock succeeded', async () => {
  const taskByDescription = await getTaskByDescription('Criando tarefa de teste')
  const taskUnblocked = await unblockTask(taskByDescription.id)
  expect(taskUnblocked.isBlocked).toBe(false)
})

test('Check if the task update succeeded', async () => {
  const taskByDescription = await getTaskByDescription('Criando tarefa de teste')
  const taskUpdated = await updateTask(taskByDescription.id, {
    createdBy: 'Tarefa #teste',
    description: 'Criando tarefa de teste',
    isBlocked: false,
    priority: 'Alto',
    responsible: 'Vite Doe',
    status: 'To do',
  })
  expect(taskUpdated.priority).toBe('Alto')
})

test('Check if the task delete succeeded', async () => {
  const taskByDescription = await getTaskByDescription('Criando tarefa de teste')
  const taskDeleted = await deleteTask(taskByDescription.id)
  expect(taskDeleted.message).toBe(`${taskByDescription.id} deleted`)
})