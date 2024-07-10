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
                        start_date
                        end_date
                        project {
                            id
                            name
                        }
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
                        start_date
                        end_date
                        project {
                            id
                            name
                        }
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

export const findTaskByProject = async (project) => {
    try {
        const response = await client.query({
            query: gql`
                query FindTaskByProject($project: Float!) {
                    FIND_TASK_BY_PROJECT(project: $project) {
                        id
                        name
                        description
                        status
                        start_date
                        end_date
                        project {
                            id
                            name
                        }
                    }
                }
            `,
            variables: { project }
        });
        return response.data.FIND_TASK_BY_PROJECT;
    } catch (error) {
        console.error('Error fetching tasks by project:', error);
        throw error;
    }
}

export const createTask = async (task) => {
    try {
        const { description, end_date, name, projectId, start_date, status } = task;
        const response = await client.mutate({
            mutation: gql`
                mutation CreateTask($description: String!, $end_date: DateTime!, $name: String!, $projectId: Float, $start_date: DateTime!, $status: String!) {
                    CREATE_TASK(createTaskDto: {
                        description: $description,
                        end_date: $end_date,
                        name: $name,
                        projectId: $projectId,
                        start_date: $start_date,
                        status: $status
                    }) {
                        id
                        name
                        description
                        status
                        start_date
                        end_date
                        project {
                            id
                            name
                        }
                    }
                }
            `,
            variables: { 
                description, 
                end_date, 
                name, 
                projectId, 
                start_date, 
                status 
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
                mutation UpdateTask($id: ID!, $description: String, $end_date: DateTime, $name: String, $projectId: Float, $start_date: DateTime, $status: String) {
                    UPDATE_TASK(id: $id, updateTaskDto: {
                        description: $description,
                        end_date: $end_date,
                        name: $name,
                        projectId: $projectId,
                        start_date: $start_date,
                        status: $status
                    }) {
                        id
                        name
                        description
                        status
                        start_date
                        end_date
                        project {
                            id
                            name
                        }
                    }
                }
            `,
            variables: { 
                id,
                ...taskUpdates
            }
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