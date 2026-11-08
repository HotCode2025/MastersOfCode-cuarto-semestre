import { Link, useLocation } from "react-router-dom";
import { PublicRoutes, PrivateRoutes } from "./navigation";
import { Conteiner } from "../ui/Conteiner";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const location = useLocation();
  const { isAuth, signout } = useAuth();
  return (
    <nav className="bg-zinc-950 ">
      <Conteiner className="flex justify-between items-center py-3">
        <Link to="/">
          <h1 className="text-2xl font-bold text-white">Proyecto PERN</h1>
        </Link>
        <ul className="flex gap-x-2">
          {isAuth ? (
            <>
              {PrivateRoutes.map(({ name, path }) => (
                <li
                  className={`text-slate-300 ${location.pathname === path && "bg-sky-500 px-3 py-1"}`}
                  key={name}
                >
                  <Link to={path}>{name}</Link>
                </li>
              ))}
              <li onClick={() => signout()}>Cerrar Sesión</li>
            </>
          ) : (
            PublicRoutes.map(({ name, path }) => (
              <li
                className={`text-slate-300 ${location.pathname === path && "bg-sky-500 px-3 py-1"}`}
                key={name}
              >
                <Link to={path}>{name}</Link>
              </li>
            ))
          )}
        </ul>
      </Conteiner>
    </nav>
  );
}

export default Navbar;