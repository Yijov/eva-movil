import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Project } from "../models/Project";
import { ProjectRepository } from "../services/persistence";

export function useProject() {
  const { id } = useLocalSearchParams();
  
  const repo = useMemo(() => new ProjectRepository(), []);
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await repo.getById(String(id));
      setProject(data||null);
    };
    load();
  }, [id, repo]);

  return project;
}