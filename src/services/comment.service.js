import client from '../apolloclient';
import { gql } from '@apollo/client';

export const createComment = async (createCommentDto) => {
    try {
        const response = await client.mutate({
            mutation: gql`
                mutation CreateComment($createCommentDto: CreateCommentDto!) {
                    CREATE_COMMENT(createCommentDto: $createCommentDto) {
                        id
                        content
                        date
                        projectId
                        taskId
                    }
                }
            `,
            variables: { createCommentDto }
        });
        return response.data.CREATE_COMMENT;
    } catch (error) {
        console.error('Error creating comment:', error);
        throw error;
    }
}

export const updateComment = async (id, updateCommentDto) => {
    try {
        const response = await client.mutate({
            mutation: gql`
                mutation UpdateComment($id: ID!, $updateCommentDto: UpdateCommentDto!) {
                    UPDATE_COMMENT(id: $id, updateCommentDto: $updateCommentDto) {
                        id
                        content
                        date
                        projectId
                        taskId
                    }
                }
            `,
            variables: { id, updateCommentDto }
        });
        return response.data.UPDATE_COMMENT;
    } catch (error) {
        console.error('Error updating comment:', error);
        throw error;
    }
}

export const deleteComment = async (id) => {
    try {
        const response = await client.mutate({
            mutation: gql`
                mutation DeleteComment($id: ID!) {
                    DELETE_COMMENT(id: $id) {
                        id
                    }
                }
            `,
            variables: { id }
        });
        return response.data.DELETE_COMMENT;
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
}

export const findComment = async (id) => {
    try {
        const response = await client.query({
            query: gql`
                query FindComment($id: ID!) {
                    FIND_COMMENT(id: $id) {
                        id
                        content
                        date
                        projectId
                        taskId
                    }
                }
            `,
            variables: { id }
        });
        return response.data.FIND_COMMENT;
    } catch (error) {
        console.error('Error fetching comment:', error);
        throw error;
    }
}

export const findComments = async () => {
    try {
        const response = await client.query({
            query: gql`
                query FindComments {
                    FIND_COMMENTS {
                        id
                        content
                        date
                        projectId
                        taskId
                    }
                }
            `
        });
        return response.data.FIND_COMMENTS;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
}