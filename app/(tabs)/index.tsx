import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useFocusEffect } from "@react-navigation/native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { Button, StyleSheet } from "react-native";
import ProjectCard from "../../components/ProjectCard";
import { Project } from "../../models/Project";
import { ProjectRepository } from "../../services/persistence";

export default function HomeScreen() {
  const [projects, setProjects] = useState<Project[]>([]);
  const repo = useMemo(() => new ProjectRepository(), []);
  const router = useRouter();
  useFocusEffect(
    useCallback(() => {
      const loadProjects = async () => {
        const data = await repo.getAll();
        setProjects(data);
      };

      loadProjects();
    }, [repo])
  );
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/banner2.jpg")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Hola!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Button
          title={"Nuevo proyecto +"}
          onPress={() => router.push("../create/new")}
        />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        {projects.map((project) => {
          return (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={async (id) => {
                await repo.delete(id); // implement this method in your repo
                const remaining = await repo.getAll();
                setProjects(remaining);
              }}
            />
          );
        })}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178+50,
    width: 290+70,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  buttonWrapper: {
    marginBottom: 8,
  },
});
