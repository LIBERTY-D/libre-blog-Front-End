import "./techstack.css"

type Tech={
  tech:string
}
export default function TechStack({tech}:Tech) {

  return (
    <div className="tech-stack">{tech}</div>
  )
}
