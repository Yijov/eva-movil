import AsyncStorage from '@react-native-async-storage/async-storage';
import { Project } from "../models/Project";

export class ProjectRepository {
  private storageKey = 'eva_projects';

  async getAll(): Promise<Project[]> {
    try {
    const json = await AsyncStorage.getItem(this.storageKey);
    if (!json) return [];
    const parsed = JSON.parse(json);
    return parsed.map((data: any) => Project.fromJSON(data));
    } catch (error) {
      console.log(error);
      return []
      
    }
  
    
  
  }

  async save(project: Project): Promise<void> {
  const maxRetries = 4;
  let attempt = 0;
  let success = false;

  while (attempt < maxRetries && !success) {
    try {
      const projects = await this.getAll();
      const index = projects.findIndex((p) => p.id === project.id);
      if (index !== -1) {
        projects[index] = project;
      } else {
        projects.push(project);
      }

      const json = JSON.stringify(projects.map((p) => p.toJSON()));
      await AsyncStorage.setItem(this.storageKey, json);

      success = true; // Exit loop
    } catch (error) {
      console.error("Save attempt failed:", error);
      attempt++;
      if (attempt === maxRetries) throw new Error("Failed to save project after retries.");
    }
  }
}


  async getByName(name: string): Promise<Project | undefined> {
    const projects = await this.getAll();
    return projects.find(p => p.name === name);
  }

   async getById(id: string): Promise<Project | undefined> {
    try {
      const projects = await this.getAll();
    return projects.find(p => p.id === id);
    } catch (error) {
       console.log(error);
    }
    
  }

  async delete(id: string): Promise<void> {
    const projects = (await this.getAll()).filter(p => p.id !== id);
    await AsyncStorage.setItem(
      this.storageKey,
      JSON.stringify(projects.map(p => p.toJSON()))
    );
  }

  async clear(): Promise<void> {
    await AsyncStorage.removeItem(this.storageKey);
  }
}

