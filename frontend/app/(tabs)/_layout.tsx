import { Tabs } from "expo-router";

export default function RootLayout() {
	return (
		<Tabs>
			<Tabs.Screen name="home" options={{ title: "Home" }} />
			<Tabs.Screen name="create" options={{ title: "Create" }} />
		</Tabs>
	)
}
