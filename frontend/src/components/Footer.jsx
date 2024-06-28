import { FaGithub as GitHub } from "react-icons/fa";
import { FaLinkedin as Linkedin } from "react-icons/fa";
import { RiFolderInfoFill as Portfolio } from "react-icons/ri";
import { Link } from "react-router-dom";
export default () => {
  return (
    <footer className="bg-neutral-800">
      <div className="container mx-auto py-16 flex justify-between items-center text-neutral-200 text-lg">
        <div>Made by Luca Caldato</div>
        <ul className="flex gap-3 text-2xl ">
          <li>
            <Link to={"https://github.com/CaldatoLuca"} target="_blanck">
              {" "}
              <GitHub />
            </Link>
          </li>
          <li>
            <Link
              to={"https://www.linkedin.com/in/luca-caldato-8ab3a72b5/"}
              target="_blanck"
            >
              {" "}
              <Linkedin />
            </Link>
          </li>
          <li>
            <Link
              to={"https://nextjs-portfolio-luca-caldatos-projects.vercel.app/"}
              target="_blanck"
            >
              {" "}
              <Portfolio />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};
