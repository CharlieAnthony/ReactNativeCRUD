import axios from 'axios';
import { itemType, newType } from '../types/itemType';

const API_URL = "http://192.168.1.124:3001/api/items";

export const getItems = async () => {
	const response = await axios.get(API_URL);
	return response.data;
}

export const getItemById = async (id: number) => {
	const response = await axios.get(`${API_URL}/${id}`);
	return response.data;
}

export const createItem = async (itemData: newType) => {
	const response = await axios.post(API_URL, itemData);
	return response.data;
}

export const updateItem = async (id: number, itemData: itemType) => {
	const response = await axios.put(`${API_URL}/${id}`, itemData);
	return response.data;
};

export const deleteItem = async (id: number) => {
	const response = await axios.delete(`${API_URL}/${id}`);
	return response.data;
}