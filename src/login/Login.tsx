import { useEffect, useState } from "react";
import metamask_logo from "/assets/metamask.svg"

export const Login = () => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {}, []);
  return (
    <div className="h-screen bg-slate-900 items-cente">
      <div className="grid grid-cols-2 gap-4">
        <LoginCard name="Metamask" connected={connected}/>
      </div>
    </div>
  );
};

interface Props {
    name: string;
    connected: boolean
}

const LoginCard = (props: Props) => {
  return (
    <div className="card w-48 bg-base-100 shadow-xl">
      <figure className="px-10">
        <img
          src={metamask_logo}
          alt={props.name}
          className="rounded-xl h-24"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{props.name}</h2>
        <div className="card-actions">
          <button className="btn btn-primary">{props.connected ? "Disconnect" : "Connect"}</button>
        </div>
      </div>
    </div>
  );
};
