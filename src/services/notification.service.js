import client from '../apolloclient';
import { gql } from '@apollo/client';

// Create a new notification
export const createNotification = async (createNotificationDto) => {
    try {
        const response = await client.mutate({
            mutation: gql`
                mutation CreateNotification($createNotificationDto: CreateNotificationDto!) {
                    CREATE_NOTIFICATION(createNotificationDto: $createNotificationDto) {
                        id
                        content
                        date
                        taskId
                    }
                }
            `,
            variables: { createNotificationDto }
        });
        return response.data.CREATE_NOTIFICATION;
    } catch (error) {
        console.error('Error creating notification:', error);
        throw error;
    }
};

// Update an existing notification
export const updateNotification = async (id, updateNotificationDto) => {
    try {
        const response = await client.mutate({
            mutation: gql`
                mutation UpdateNotification($id: Float!, $updateNotificationDto: UpdateNotificationDto!) {
                    UPDATE_NOTIFICATION(id: $id, updateNotificationDto: $updateNotificationDto) {
                        id
                        content
                        date
                    }
                }
            `,
            variables: { id, updateNotificationDto }
        });
        return response.data.UPDATE_NOTIFICATION;
    } catch (error) {
        console.error('Error updating notification:', error);
        throw error;
    }
};

// Delete a notification
export const deleteNotification = async (id) => {
    try {
        const response = await client.mutate({
            mutation: gql`
                mutation DeleteNotification($id: Float!) {
                    DELETE_NOTIFICATION(id: $id) {
                        id
                    }
                }
            `,
            variables: { id }
        });
        return response.data.DELETE_NOTIFICATION;
    } catch (error) {
        console.error('Error deleting notification:', error);
        throw error;
    }
};

// Find a specific notification by ID
export const findNotification = async (id) => {
    try {
        const response = await client.query({
            query: gql`
                query FindNotification($id: Float!) {
                    FIND_NOTIFICATION(id: $id) {
                        id
                        content
                        date
                        taskId
                    }
                }
            `,
            variables: { id }
        });
        return response.data.FIND_NOTIFICATION;
    } catch (error) {
        console.error('Error fetching notification:', error);
        throw error;
    }
};

// Find all notifications
export const findNotifications = async () => {
    try {
        const response = await client.query({
            query: gql`
                query FindNotifications {
                    FIND_NOTIFICATIONS {
                        id
                        content
                        date
                        taskId
                    }
                }
            `
        });
        return response.data.FIND_NOTIFICATIONS;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        throw error;
    }
};