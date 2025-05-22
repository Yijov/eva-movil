import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { Project } from "../models/Project";
import { ProjectRepository } from "../services/persistence";

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function useProject() {
  const { id } = useLocalSearchParams();
  const repo = useMemo(() => new ProjectRepository(), []);
  const [project, setProject] = useState<Project | null>(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const load = async () => {
        const maxRetries = 4;
        let attempt = 0;
        let result: Project | undefined;

        while (attempt < maxRetries && !result) {
          result = await repo.getById(String(id));
          if (!result) {
            attempt++;
            await wait(150); // small delay before retrying
          }
        }

        if (isActive) {
          setProject(result || null);
        }
      };

      load();

      return () => {
        isActive = false;
      };
    }, [id, repo])
  );

  return project;
}