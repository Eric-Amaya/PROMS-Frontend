import client from '../apolloclient';
import { gql } from '@apollo/client';

export const findProject = async (id) => {
    try {
        const response = await client.query({
            query: gql`
                query FindProject($id: Float!) {
                    FIND_PROJECT(id: $id) {
                        id
                        name
                        amount_participants
                        start_date
                        end_date
                    }
                }
            `,
            variables: { id }
        });
        return response.data.FIND_PROJECT;
    } catch (error) {
        console.error('Error fetching project:', error);
        throw error;
    }
}

export const findProjects = async () => {
    try {
        const response = await client.query({
            query: gql`
                query FindProjects {
                    FIND_PROJECTS {
                        id
                        name
                        amount_participants
                        start_date
                        end_date
                    }
                }
            `
        });
        return response.data.FIND_PROJECTS;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
}
export const createProject = async (project) => {
    try {
        const { amount_participants, end_date, name, start_date } = project;
        const response = await client.mutate({
            mutation: gql`
                mutation CreateProject($amount_participants: Float!, $end_date: DateTime!, $name: String!, $start_date: DateTime!) {
                    CREATE_PROJECT(createProjectDto: {
                        amount_participants: $amount_participants,
                        end_date: $end_date,
                        name: $name,
                        start_date: $start_date
                    }) {
                        id
                        name
                        start_date
                        end_date
                        amount_participants
                    }
                }
            `,
            variables: { 
                amount_participants, 
                end_date, 
                name, 
                start_date 
            }
        });
        return response.data.CREATE_PROJECT;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error; 
    }
}

export const updateProject = async (id, projectUpdates) => {
    try {
        const response = await client.mutate({
            mutation: gql`
                mutation UpdateProject($id: Float!, $projectUpdates: UpdateProjectDto!) {
                    UPDATE_PROJECT(id: $id, updateProjectDto: $projectUpdates) {
                        id
                        name
                        amount_participants
                        start_date
                        end_date
                    }
                }
            `,
            variables: { id, projectUpdates }
        });
        return response.data.UPDATE_PROJECT;
    } catch (error) {
        console.error('Error updating project:', error);
        throw error;
    }
}

export const deleteProject = async (id) => {
    try {
        const response = await client.mutate({
            mutation: gql`
                mutation DeleteProject($id: Float!) {
                    DELETE_PROJECT(id: $id) {
                        id
                        name
                    }
                }
            `,
            variables: { id }
        });
        return response.data.DELETE_PROJECT;
    } catch (error) {
        console.error('Error deleting project:', error);
        throw error;
    }
}