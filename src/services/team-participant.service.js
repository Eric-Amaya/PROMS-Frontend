import client from '../apolloclient';
import { gql } from '@apollo/client';

export const findTeamParticipant = async (id) => {
    try {
        const response = await client.query({
            query: gql`
                query FindTeamParticipant($id: Float!) {
                    FIND_TEAM_PARTICIPANT(id: $id) {
                        id
                        participant {
                            id
                            name
                            email
                        }
                        role
                        tasks {
                            id
                            name
                        }
                        team {
                            id
                            name
                        }
                    }
                }
            `,
            variables: { id }
        });
        return response.data.FIND_TEAM_PARTICIPANT;
    } catch (error) {
        console.error('Error fetching team participant:', error);
        throw error;
    }
}

export const findTeamParticipants = async () => {
    try {
        const response = await client.query({
            query: gql`
                query FindTeamParticipants {
                    FIND_TEAM_PARTICIPANTS {
                        id
                        participant {
                            id
                            name
                            email
                        }
                        role
                        tasks {
                            id
                            name
                        }
                        team {
                            id
                            name
                        }
                    }
                }
            `
        });
        return response.data.FIND_TEAM_PARTICIPANTS;
    } catch (error) {
        console.error('Error fetching team participants:', error);
        throw error;
    }
}

export const createTeamParticipant = async (teamParticipant) => {
    try {
        const { id_participant, id_task, id_team, role } = teamParticipant;
        const response = await client.mutate({
            mutation: gql`
                mutation CreateTeamParticipant($id_participant: Float, $id_task: [Float!], $id_team: Float, $role: String!) {
                    CREATE_TEAM_PARTICIPANT(createTeamParticipantDto: {
                        id_participant: $id_participant,
                        id_task: $id_task,
                        id_team: $id_team,
                        role: $role
                    }) {
                        id
                        participant {
                            id
                            name
                            email
                        }
                        role
                        tasks {
                            id
                            name
                        }
                        team {
                            id
                            name
                        }
                    }
                }
            `,
            variables: { 
                id_participant, 
                id_task, 
                id_team, 
                role 
            }
        });
        return response.data.CREATE_TEAM_PARTICIPANT;
    } catch (error) {
        console.error('Error creating team participant:', error);
        throw error;
    }
}

export const updateTeamParticipant = async (id, updates) => {
    try {
        const response = await client.mutate({
            mutation: gql`
                mutation UpdateTeamParticipant($id: Float!, $updates: UpdateTeamParticipantDto!) {
                    UPDATE_TEAM_PARTICIPANT(id: $id, updateTeamParticipantDto: $updates) {
                        id
                        participant {
                            id
                            name
                            email
                        }
                        role
                        tasks {
                            id
                            name
                        }
                        team {
                            id
                            name
                        }
                    }
                }
            `,
            variables: { id, updates }
        });
        return response.data.UPDATE_TEAM_PARTICIPANT;
    } catch (error) {
        console.error('Error updating team participant:', error);
        throw error;
    }
}

export const deleteTeamParticipant = async (id) => {
    try {
        const response = await client.mutate({
            mutation: gql`
                mutation DeleteTeamParticipant($id: Float!) {
                    DELETE_TEAM_PARTICIPANT(id: $id) {
                        id
                    }
                }
            `,
            variables: { id }
        });
        return response.data.DELETE_TEAM_PARTICIPANT;
    } catch (error) {
        console.error('Error deleting team participant:', error);
        throw error;
    }
}