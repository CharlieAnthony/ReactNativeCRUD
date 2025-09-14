import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "@emotion/native";
import { useRouter } from "expo-router";
import { createItem } from "@/app/api/items";

export default function Create() {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [imageId, setImageId] = useState("");
	const router = useRouter();

	const handleSubmit = async () => {
		if (!title || !body || !imageId) {
			Alert.alert("Please fill in all fields");
			return;
		}

		try {
			await createItem({
				title,
				body,
				imageId: parseInt(imageId, 10),
			});
			Alert.alert("Item created successfully");
			router.back(); // go back to home page
		} catch (error) {
			Alert.alert("Error creating item", (error as Error).message);
		}
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={{ flex: 1 }}
			>
				<Container>
					<Label>Title</Label>
					<Input value={title} onChangeText={setTitle} placeholder="Enter title" />
	
					<Label>Body</Label>
					<Input
						value={body}
						onChangeText={setBody}
						placeholder="Enter body"
						multiline
						numberOfLines={4}
					/>
	
					<Label>Image ID</Label>
					<Input
						value={imageId}
						onChangeText={setImageId}
						placeholder="Enter image ID"
						keyboardType="number-pad"
					/>
	
					<Button onPress={handleSubmit}>
						<ButtonText>Create Item</ButtonText>
					</Button>
				</Container>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	);
}

// Styled components
const Container = styled(View)({
	flex: 1,
	padding: 20,
	backgroundColor: "#fff",
});

const Label = styled(Text)({
	fontSize: 16,
	fontWeight: "bold",
	marginBottom: 5,
	marginTop: 15,
});

const Input = styled(TextInput)({
	borderWidth: 1,
	borderColor: "#ccc",
	borderRadius: 8,
	padding: 10,
	fontSize: 16,
	backgroundColor: "#f9f9f9",
});

const Button = styled(TouchableOpacity)({
	marginTop: 30,
	backgroundColor: "#007aff",
	padding: 15,
	borderRadius: 8,
	alignItems: "center",
});

const ButtonText = styled(Text)({
	color: "#fff",
	fontSize: 16,
	fontWeight: "bold",
});
