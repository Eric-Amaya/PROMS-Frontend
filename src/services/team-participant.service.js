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
        const { participantId, role, teamId } = teamParticipant;
        const response = await client.mutate({
            mutation: gql`
                mutation CreateTeamParticipant($participantId: Float!, $role: String!, $teamId: Float!) {
                    CREATE_TEAM_PARTICIPANT(createTeamParticipantDto: {
                        participantId: $participantId,
                        role: $role,
                        teamId: $teamId
                    }) {
                        id
                        participant {
                            id
                            name
                            email
                        }
                        role
                        team {
                            id
                            name
                        }
                    }
                }
            `,
            variables: { 
                participantId, 
                role, 
                teamId 
            }
        });
        return response.data.CREATE_TEAM_PARTICIPANT;
    } catch (error) {
        console.error('Error creating team participant:', error);
        throw error;
    }
}

export const updateTeamParticipant = async (id, teamParticipantUpdates) => {
    try {
        const response = await client.mutate({
            mutation: gql`
                mutation UpdateTeamParticipant($id: Float!, $teamParticipantUpdates: UpdateTeamParticipantDto!) {
                    UPDATE_TEAM_PARTICIPANT(id: $id, updateTeamParticipantDto: $teamParticipantUpdates) {
                        id
                        participant {
                            id
                            name
                            email
                        }
                        role
                        team {
                            id
                            name
                        }
                    }
                }
            `,
            variables: { id, teamParticipantUpdates }
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

export const findTeamsByParticipant = async (participantId) => {
    try {
        const response = await client.query({
            query: gql`
                query FindTeamsByParticipant($participantId: Float!) {
                    FIND_TEAMS_BY_PARTICIPANT(participantId: $participantId) {
                        id
                        name
                        participants {
                            id
                            participant {
                                id
                                name
                                email
                            }
                            role
                        }
                    }
                }
            `,
            variables: { participantId }
        });
        return response.data.FIND_TEAMS_BY_PARTICIPANT;
    } catch (error) {
        console.error('Error fetching teams by participant:', error);
        throw error;
    }
}

export const findParticipantsByTeam = async (teamId) => {
    try {
        const response = await client.query({
            query: gql`
                query FindParticipantsByTeam($teamId: Float!) {
                    FIND_PARTICIPANTS_BY_TEAM(teamId: $teamId) {
                        id
                        participant {
                            id
                            name
                            email
                        }
                        role
                    }
                }
            `,
            variables: { teamId }
        });
        return response.data.FIND_PARTICIPANTS_BY_TEAM;
    } catch (error) {
        console.error('Error fetching participants by team:', error);
        throw error;
    }
}

export const findProjectsByParticipant = async (participantId) => {
    try {
        const response = await client.query({
            query: gql`
                query FindProjectsByParticipant($participantId: Float!) {
                    FIND_PROJECTS_BY_PARTICIPANT(participantId: $participantId) {
                        id
                        name
                        description
                        team {
                            id
                            name
                        }
                    }
                }
            `,
            variables: { participantId }
        });
        return response.data.FIND_PROJECTS_BY_PARTICIPANT;
    } catch (error) {
        console.error('Error fetching projects by participant:', error);
        throw error;
    }
}

export const findParticipantsByProject = async (projectId) => {
    try {
        const response = await client.query({
            query: gql`
                query FindParticipantsByProject($projectId: Float!) {
                    FIND_PARTICIPANTS_BY_PROJECT(projectId: $projectId) {
                        id
                        participant {
                            id
                            name
                            email
                        }
                        role
                    }
                }
            `,
            variables: { projectId }
        });
        return response.data.FIND_PARTICIPANTS_BY_PROJECT;
    } catch (error) {
        console.error('Error fetching participants by project:', error);
        throw error;
    }
}