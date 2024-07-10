import client from '../apolloclient';
import { gql } from '@apollo/client';

export const findTeam = async (id) => {
    try {
        const response = await client.query({
            query: gql`
                query FindTeam($id: Float!) {
                    FIND_TEAM(id: $id) {
                        id
                        name
                        description
                        type
                        project {
                            id
                            name
                        }
                    }
                }
            `,
            variables: { id }
        });
        return response.data.FIND_TEAM;
    } catch (error) {
        console.error('Error fetching team:', error);
        throw error;
    }
}

export const findTeams = async () => {
    try {
        const response = await client.query({
            query: gql`
                query FindTeams {
                    FIND_TEAMS {
                        id
                        name
                        description
                        type
                        project {
                            id
                            name
                        }
                    }
                }
            `
        });
        return response.data.FIND_TEAMS;
    } catch (error) {
        console.error('Error fetching teams:', error);
        throw error;
    }
}

export const createTeam = async (team) => {
    try {
        const { name, description, projectId, type } = team;
        const response = await client.mutate({
            mutation: gql`
                mutation CreateTeam($name: String!, $description: String!, $projectId: Float, $type: String!) {
                    CREATE_TEAM(createTeamDto: {
                        name: $name,
                        description: $description,
                        projectId: $projectId,
                        type: $type
                    }) {
                        id
                        name
                        description
                        type
                        project {
                            id
                            name
                        }
                    }
                }
            `,
            variables: { 
                name, 
                description, 
                projectId, 
                type 
            }
        });
        return response.data.CREATE_TEAM;
    } catch (error) {
        console.error('Error creating team:', error);
        throw error;
    }
}

export const updateTeam = async (id, { name, description, projectId, type }) => {
    try {
        const response = await client.mutate({
            mutation: gql`
                mutation UpdateTeam($id: Float!, $name: String, $description: String, $projectId: Float, $type: String) {
                    UPDATE_TEAM(id: $id, updateTeamDto: {
                        name: $name,
                        description: $description,
                        projectId: $projectId,
                        type: $type
                    }) {
                        id
                        name
                        description
                        type
                        project {
                            id
                            name
                        }
                    }
                }
            `,
            variables: { id, name, description, projectId, type }
        });
        return response.data.UPDATE_TEAM;
    } catch (error) {
        console.error('Error updating team:', error);
        throw error;
    }
}

export const deleteTeam = async (id) => {
    try {
        const response = await client.mutate({
            mutation: gql`
                mutation DeleteTeam($id: Float!) {
                    DELETE_TEAM(id: $id) {
                        id
                        name
                        description
                        type
                    }
                }
            `,
            variables: { id }
        });
        return response.data.DELETE_TEAM;
    } catch (error) {
        console.error('Error deleting team:', error);
        throw error;
    }
}