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
    try {

      const projects = await this.getAll();
    const index = projects.findIndex(p => p.name === project.name);
    if (index !== -1) {
      projects[index] = project;
    } else {
      projects.push(project);
    }
    await AsyncStorage.setItem(
      this.storageKey,
      JSON.stringify(projects.map(p => p.toJSON()))
    );
      
    } catch (error) {

      console.log(error);
      
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

  async delete(name: string): Promise<void> {
    const projects = (await this.getAll()).filter(p => p.name !== name);
    await AsyncStorage.setItem(
      this.storageKey,
      JSON.stringify(projects.map(p => p.toJSON()))
    );
  }

  async clear(): Promise<void> {
    await AsyncStorage.removeItem(this.storageKey);
  }
}

