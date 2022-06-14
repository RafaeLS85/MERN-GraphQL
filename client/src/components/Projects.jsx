import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import ProjectCard from "./ProjectCard";
import Spinner from "./Spinner";

export const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <Spinner />;
  if (error) return <p>Error :(</p>;

  return (
    <>
      {data.projects.length ? (
        <div className="row">
          {data.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p>No projects found</p>
      )}
    </>
  );
};
