import client from '../apolloclient';
import { gql } from '@apollo/client';

export const createParticipant = async (createParticipantDto) => {
    try {
        const response = await client.mutate({
            mutation: gql`
                mutation CreateParticipant($createParticipantDto: CreateParticipantDto!) {
                    CREATE_PARTICIPANT(createParticipantDto: $createParticipantDto) {
                        id
                        name
                        last_name
                        email
                        rut
                        password
                        participantConversationId
                        teamParticipantId
                    }
                }
            `,
            variables: { createParticipantDto }
        });
        return response.data.createParticipant;
    } catch (error) {
        console.error('Error creating participant:', error);
        throw error;
    }
};

export const findParticipant = async (id) => {
    try {
        const response = await client.query({
            query: gql`
                query FindParticipant($id: Float!) {
                    FIND_PARTICIPANT(id: $id) {
                        id
                        name
                        last_name
                        email
                        rut
                        participantConversation {
                            id
                            id_conversation {
                                id
                            }
                        }
                        teamParticipant {
                            id
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
                }
            `,
            variables: { id }
        });
        return response.data.findParticipant;
    } catch (error) {
        console.error('Error finding participant:', error);
        throw error;
    }
};

export const findParticipantsByProject = async (projectId) => {
    try {
        const response = await client.query({
            query: gql`
                query FindParticipantsByProject($id: Float!) {
                    FIND_PARTICIPANTS_BY_PROJECT(id: $id) {
                        id
                        name
                        last_name
                        email
                        rut
                        participantConversation {
                            id
                            id_conversation {
                                id
                            }
                        }
                        teamParticipant {
                            id
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
                }
            `,
            variables: { id: projectId }
        });
        return response.data.FIND_PARTICIPANTS_BY_PROJECT;
    } catch (error) {
        console.error('Error finding participants by project:', error);
        throw error;
    }
};

export const findAllParticipants = async () => {
    try {
        const response = await client.query({
            query: gql`
                query FindParticipants {
                    FIND_PARTICIPANTS {
                        id
                        name
                        last_name
                        email
                        rut
                        participantConversation {
                            id
                            id_conversation {
                                id
                            }
                        }
                        teamParticipant {
                            id
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
                }
            `
        });
        return response.data.FIND_PARTICIPANTS; 
    } catch (error) {
        console.error('Error finding all participants:', error);
        throw error;
    }
};

export const updateParticipant = async (id, updateParticipantDto) => {
    try {
        const response = await client.mutate({
            mutation: gql`
                mutation UpdateParticipant($id: Float!, $updateParticipantDto: UpdateParticipantDto!) {
                    UPDATE_PARTICIPANT(id: $id, updateParticipantDto: $updateParticipantDto) {
                        id
                        name
                        last_name
                        email
                        rut
                        participantConversationId
                        teamParticipantId
                    }
                }
            `,
            variables: { id, updateParticipantDto }
        });
        return response.data.updateParticipant;
    } catch (error) {
        console.error('Error updating participant:', error);
        throw error;
    }
};

export const deleteParticipant = async (id) => {
    try {
        const response = await client.mutate({
            mutation: gql`
                mutation DeleteParticipant($id: Float!) {
                    DELETE_PARTICIPANT(id: $id) {
                        id
                    }
                }
            `,
            variables: { id }
        });
        return response.data.deleteParticipant;
    } catch (error) {
        console.error('Error deleting participant:', error);
        throw error;
    }
};