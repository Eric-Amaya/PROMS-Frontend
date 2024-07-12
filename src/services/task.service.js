import client from '../apolloclient';
import { gql } from '@apollo/client';

export const findTask = async (id) => {
    try {
        const response = await client.query({
            query: gql`
                query FindTask($id: Float!) {
                    FIND_TASK(id: $id) {
                        id
                        name
                        description
                        status
                        project {
                            id
                            name
                        }
                        start_date
                        end_date
                    }
                }
            `,
            variables: { id }
        });
        return response.data.FIND_TASK;
    } catch (error) {
        console.error('Error fetching task:', error);
        throw error;
    }
}

export const findTasks = async () => {
    try {
        const response = await client.query({
            query: gql`
                query FindTasks {
                    FIND_TASKS {
                        id
                        name
                        description
                        status
                        project {
                            id
                            name
                        }
                        start_date
                        end_date
                    }
                }
            `
        });
        return response.data.FIND_TASKS;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
}

export const findTasksByProject = async (projectId) => {
    try {
        const response = await client.query({
            query: gql`
                query FindTasksByProject($projectId: Float!) {
                    FIND_TASKS_BY_PROJECT(project: $projectId) {
                        id
                        name
                        description
                        status
                        project {
                            id
                            name
                        }
                        start_date
                        end_date
                    }
                }
            `,
            variables: { projectId }
        });
        return response.data.FIND_TASKS_BY_PROJECT;
    } catch (error) {
        console.error('Error fetching tasks by project:', error);
        throw error;
    }
}

export const createTask = async (task) => {
    try {
        const { name, description, status, projectId, start_date, end_date } = task;
        const response = await client.mutate({
            mutation: gql`
                mutation CreateTask($name: String!, $description: String!, $status: String!, $projectId: Float, $start_date: DateTime!, $end_date: DateTime!) {
                    CREATE_TASK(createTaskDto: {
                        name: $name,
                        description: $description,
                        status: $status,
                        projectId: $projectId,
                        start_date: $start_date,
                        end_date: $end_date
                    }) {
                        id
                        name
                        description
                        status
                        project {
                            id
                            name
                        }
                        start_date
                        end_date
                    }
                }
            `,
            variables: { 
                name, 
                description, 
                status, 
                projectId, 
                start_date, 
                end_date 
            }
        });
        return response.data.CREATE_TASK;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
}

export const updateTask = async (id, taskUpdates) => {
    try {
        const response = await client.mutate({
            mutation: gql`
                mutation UpdateTask($id: Float!, $taskUpdates: UpdateTaskDto!) {
                    UPDATE_TASK(id: $id, updateTaskDto: $taskUpdates) {
                        id
                        name
                        description
                        status
                        project {
                            id
                            name
                        }
                        start_date
                        end_date
                    }
                }
            `,
            variables: { id, taskUpdates }
        });
        return response.data.UPDATE_TASK;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
}

export const deleteTask = async (id) => {
    try {
        const response = await client.mutate({
            mutation: gql`
                mutation DeleteTask($id: Float!) {
                    DELETE_TASK(id: $id) {
                        id
                        name
                        description
                        status
                    }
                }
            `,
            variables: { id }
        });
        return response.data.DELETE_TASK;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
}