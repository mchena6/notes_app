import { getProjects } from "@/lib/projects";

export default function Page() {
  const projects = getProjects();

  return (
    <main className="flex flex-col items-center pt-10">
      <section className="w-full max-w-3xl flex flex-col items-center bg-zinc-800 rounded-lg p-10">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          className="h-24 w-24 rounded-full"
          alt=""
        />
        <h1 className="text-3xl font-bold">Valentino</h1>
        <p className="text-gray-400">
          Desarrollador Fullstack especializado en React y Node.js
        </p>
        <p className="flex gap-1 items-center">
          <svg
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-geo-alt"
            viewBox="0 0 16 16"
          >
            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
          </svg>
          Argentina
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mt-10 mb-4">Proyectos</h2>
        <div className="w-full max-w-3xl grid grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-zinc-800 rounded-lg p-6">
              <img
                src={project.image}
                alt={project.title}
                className="w-full object-cover rounded hover:scale-102 transition-transform duration-200"
              />
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-gray-400">{project.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
