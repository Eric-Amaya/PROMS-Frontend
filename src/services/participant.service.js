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
                    }
                }
            `,
            variables: { createParticipantDto }
        });
        return response.data.CREATE_PARTICIPANT;
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
                    }
                }
            `,
            variables: { id }
        });
        return response.data.FIND_PARTICIPANT;
    } catch (error) {
        console.error('Error finding participant:', error);
        throw error;
    }
};

export const findParticipantByRut = async (rut) => {
    try {
        const response = await client.query({
            query: gql`
                query FindParticipantByRut($rut: String!) {
                    FIND_PARTICIPANT_BY_RUT(rut: $rut) {
                        id
                        name
                        last_name
                        email
                        rut
                    }
                }
            `,
            variables: { rut }
        });
        return response.data.FIND_PARTICIPANT_BY_RUT;
    } catch (error) {
        console.error('Error fetching participant by RUT:', error);
        throw error;
    }
}

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
                    }
                }
            `,
            variables: { id, updateParticipantDto }
        });
        return response.data.UPDATE_PARTICIPANT;
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
        return response.data.DELETE_PARTICIPANT;
    } catch (error) {
        console.error('Error deleting participant:', error);
        throw error;
    }
};