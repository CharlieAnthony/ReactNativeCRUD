import { View, Text, Image, ScrollView, Alert, TouchableOpacity } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { getItemById, deleteItem } from "@/app/api/items";
import { itemType } from "@/app/types/itemType";
import styled from "@emotion/native";
import { getImageById } from "../api/images";


export default function ItemDetail() {
	const { id } = useLocalSearchParams();
	const itemId = Array.isArray(id) ? id[0] : id;
	const [item, setItem] = useState<itemType | null>(null);
	const router = useRouter();

	useEffect(() => {
		const fetchItem = async () => {
			const data = await getItemById(parseInt(itemId));
			setItem(data);
		};
		fetchItem();
	}, [id]);

	const handleDelete = async () => {
		Alert.alert(
			"Delete Item",
			"Are you sure you want to delete this item?",
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Delete",
					style: "destructive",
					onPress: async () => {
						await deleteItem(parseInt(itemId));
						router.back();
					},
				},
			]
		);
	};

	if (!item) return <Text>Loading...</Text>;

	return (
		<>
			<Stack.Screen
				options={{
					title: item.title,
					headerLeft: () => (
						<BackButton onPress={() => router.back()}>
							<BackText>Back</BackText>
						</BackButton>
					),
					headerRight: () => (
						<DeleteButton onPress={handleDelete}>
							<DeleteText>Delete</DeleteText>
						</DeleteButton>
					),
				}}
			/>
			<ScrollViewContainer>
				<ItemImage source={getImageById(item.imageId)} resizeMode="cover" />
				<Content>
					<Title>{item.title}</Title>
					<DateText>{item.createdDate}</DateText>
					<Body>{item.body}</Body>
				</Content>
			</ScrollViewContainer>
		</>
	);
}

const ScrollViewContainer = styled(ScrollView)({
	flex: 1,
	backgroundColor: "#fff",
});

const ItemImage = styled(Image)({
	width: "100%",
	height: 300,
});

const Content = styled(View)({
	padding: 20,
});

const Title = styled(Text)({
	fontSize: 28,
	fontWeight: "bold",
	marginBottom: 5,
});

const DateText = styled(Text)({
	fontSize: 14,
	color: "#888",
	marginBottom: 15,
});

const Body = styled(Text)({
	fontSize: 16,
	lineHeight: 24,
});

const BackButton = styled(TouchableOpacity)({
	paddingHorizontal: 15,
});

const BackText = styled(Text)({
	fontSize: 16,
	color: "#007aff",
});

const DeleteButton = styled(TouchableOpacity)({
	paddingHorizontal: 15,
});

const DeleteText = styled(Text)({
	fontSize: 16,
	color: "#ff3b30",
});
