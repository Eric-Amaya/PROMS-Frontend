import client from '../apolloclient';
import { gql } from '@apollo/client';

export const findResource = async (id) => {
    try {
        const response = await client.query({
            query: gql`
                query FindResource($id: Float!) {
                    FIND_RESOURCE(id: $id) {
                        id
                        category
                        content
                        project {
                            id
                            name
                        }
                    }
                }
            `,
            variables: { id }
        });
        return response.data.FIND_RESOURCE;
    } catch (error) {
        console.error('Error fetching resource:', error);
        throw error;
    }
}

export const findResources = async () => {
    try {
        const response = await client.query({
            query: gql`
                query FindResources {
                    FIND_RESOURCES {
                        id
                        category
                        content
                        project {
                            id
                            name
                        }
                    }
                }
            `
        });
        return response.data.FIND_RESOURCES;
    } catch (error) {
        console.error('Error fetching resources:', error);
        throw error;
    }
}

export const findResourcesByProject = async (projectId) => {
    try {
        const response = await client.query({
            query: gql`
                query FindResourcesByProject($projectId: Float!) {
                    FIND_RESOURCES_BY_PROJECT(projectId: $projectId) {
                        id
                        category
                        content
                        project {
                            id
                            name
                        }
                    }
                }
            `,
            variables: { projectId }
        });
        return response.data.FIND_RESOURCES_BY_PROJECT;
    } catch (error) {
        console.error('Error fetching resources by project:', error);
        throw error;
    }
}

export const createResource = async (resource) => {
    try {
        const { category, content, projectId } = resource;
        const response = await client.mutate({
            mutation: gql`
                mutation CreateResource($category: String!, $content: String!, $projectId: Float) {
                    CREATE_RESOURCE(createResourceDto: {
                        category: $category,
                        content: $content,
                        projectId: $projectId
                    }) {
                        id
                        category
                        content
                        project {
                            id
                            name
                        }
                    }
                }
            `,
            variables: { 
                category, 
                content, 
                projectId 
            }
        });
        return response.data.CREATE_RESOURCE;
    } catch (error) {
        console.error('Error creating resource:', error);
        throw error;
    }
}

export const updateResource = async (id, resourceUpdates) => {
    try {
        const response = await client.mutate({
            mutation: gql`
                mutation UpdateResource($id: Float!, $resourceUpdates: UpdateResourceDto!) {
                    UPDATE_RESOURCE(id: $id, updateResourceDto: $resourceUpdates) {
                        id
                        category
                        content
                        project {
                            id
                            name
                        }
                    }
                }
            `,
            variables: { id, resourceUpdates }
        });
        return response.data.UPDATE_RESOURCE;
    } catch (error) {
        console.error('Error updating resource:', error);
        throw error;
    }
}

export const deleteResource = async (id) => {
    try {
        const response = await client.mutate({
            mutation: gql`
                mutation DeleteResource($id: Float!) {
                    DELETE_RESOURCE(id: $id) {
                        id
                        category
                        content
                    }
                }
            `,
            variables: { id }
        });
        return response.data.DELETE_RESOURCE;
    } catch (error) {
        console.error('Error deleting resource:', error);
        throw error;
    }
}