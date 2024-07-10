import client from '../apolloclient';
import { gql } from '@apollo/client';

export const findStatusChanged = async (id) => {
    try {
        const response = await client.query({
            query: gql`
                query FindStatusChanged($id: Float!) {
                    FIND_STATUS_CHANGED(id: $id) {
                        id
                        actual_status
                        previous_status
                        date
                        task {
                            id
                            name
                        }
                    }
                }
            `,
            variables: { id }
        });
        return response.data.FIND_STATUS_CHANGED;
    } catch (error) {
        console.error('Error fetching status changed:', error);
        throw error;
    }
}

export const findStatusesChanged = async () => {
    try {
        const response = await client.query({
            query: gql`
                query FindStatusesChanged {
                    FIND_STATUSES_CHANGED {
                        id
                        actual_status
                        previous_status
                        date
                        task {
                            id
                            name
                        }
                    }
                }
            `
        });
        return response.data.FIND_STATUSES_CHANGED;
    } catch (error) {
        console.error('Error fetching statuses changed:', error);
        throw error;
    }
}

export const createStatusChanged = async (statusChanged) => {
    try {
        const { actual_status, previous_status, date, taskId } = statusChanged;
        const response = await client.mutate({
            mutation: gql`
                mutation CreateStatusChanged($actual_status: String!, $previous_status: String!, $date: DateTime!, $taskId: Float) {
                    CREATE_STATUS_CHANGED(createStatusChangedDto: {
                        actual_status: $actual_status,
                        previous_status: $previous_status,
                        date: $date,
                        taskId: $taskId
                    }) {
                        id
                        actual_status
                        previous_status
                        date
                        task {
                            id
                            name
                        }
                    }
                }
            `,
            variables: { 
                actual_status, 
                previous_status, 
                date, 
                taskId 
            }
        });
        return response.data.CREATE_STATUS_CHANGED;
    } catch (error) {
        console.error('Error creating status changed:', error);
        throw error;
    }
}

export const updateStatusChanged = async (id, statusChangedUpdates) => {
    try {
        const response = await client.mutate({
            mutation: gql`
                mutation UpdateStatusChanged($id: Float!, $statusChangedUpdates: UpdateStatusChangedDto!) {
                    UPDATE_STATUS_CHANGED(id: $id, updateStatusChangedDto: $statusChangedUpdates) {
                        id
                        actual_status
                        previous_status
                        date
                        task {
                            id
                            name
                        }
                    }
                }
            `,
            variables: { id, statusChangedUpdates }
        });
        return response.data.UPDATE_STATUS_CHANGED;
    } catch (error) {
        console.error('Error updating status changed:', error);
        throw error;
    }
}

export const deleteStatusChanged = async (id) => {
    try {
        const response = await client.mutate({
            mutation: gql`
                mutation DeleteStatusChanged($id: Float!) {
                    DELETE_STATUS_CHANGED(id: $id) {
                        id
                        actual_status
                        previous_status
                        date
                    }
                }
            `,
            variables: { id }
        });
        return response.data.DELETE_STATUS_CHANGED;
    } catch (error) {
        console.error('Error deleting status changed:', error);
        throw error;
    }
}