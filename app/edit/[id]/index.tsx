import { useProject } from "../../../hooks/useProject";
import NewProjectScreen from "../../create/new";

export default function EditProjectPage() {
  const project = useProject();


  if (!project) return null;

  return <NewProjectScreen initialProject={project} isEditing />;
}