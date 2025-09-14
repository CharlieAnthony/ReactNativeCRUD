import { View, ScrollView } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getItems } from '../api/items';
import { itemType } from '../types/itemType';
import Card from "../conponents/Card";

export default function home() {

	const [data, setData] = useState([])
	
	const fetchItems = async () => {
	    const responseData = await getItems();
		setData(responseData);
	};
	
	useFocusEffect(
		useCallback(() => {
			fetchItems();
		}, [])
	);
	
	useEffect(() => {
		fetchItems();
	}, []);
	
    return (
        <View style={{ flex: 1 }} >
			<ScrollView contentContainerStyle={{ alignItems: "center", padding: 10}}>
				{data.map((item: itemType) => (
					<Card item={item} key={item.id} />
				))}	
			</ScrollView>
		</View>
    );
}
