import { Text, Image, Pressable } from "react-native";
import styled from "@emotion/native";
import { useRouter } from "expo-router";
import { itemType } from "../types/itemType";
import { getImageById } from "../api/images";

type CardProps = {
	item: itemType;
};

const Card = ({ item }: CardProps) => {
	
	const router = useRouter();
	
	return (
		<Pressable onPress={() => router.push({ pathname: "/item/[id]", params: { id: item.id.toString() } } )}>
			<CardContainer>
				<Image source={getImageById(item.imageId)} style={{ width: 100, height: 100 }} />
				<Title>{item.title}</Title>
				{item.body && <Description>{item.body}</Description>}
			</CardContainer>
		</Pressable>
	);
};

export default Card;

const CardContainer = styled.View({
	backgroundColor: "#fff",
	borderRadius: 10,
	padding: 16,
	marginVertical: 8,
	marginHorizontal: 16,
	shadowColor: "#000",
	shadowOffset: { width: 0, height: 2 },
	shadowOpacity: 0.1,
	shadowRadius: 6,
	elevation: 3,
});

const Title = styled(Text)({
	fontSize: 18,
	fontWeight: "600",
	marginBottom: 4,
});

const Description = styled(Text)({
	fontSize: 14,
	color: "#555",
});
