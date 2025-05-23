import { Project } from "@/models/Project";
import { useRouter } from "expo-router";
import { Alert, Pressable, StyleSheet, Text } from "react-native";

type Props = {
  project: Project;
  onDelete: (id: string) => void;
};

export default function ProjectCard({ project, onDelete }: Props) {
  const router = useRouter();

  const handleLongPress = () => {
    Alert.alert(
      "Delete Project",
      `Are you sure you want to delete "${project.name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => onDelete(project.id),
        },
      ]
    );
  };

  return (
    <Pressable
      onPress={() => router.push(`../overview/${project.id}`)}
      onLongPress={handleLongPress}
      style={styles.card}
    >
      <Text style={styles.title}>{project.name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
});