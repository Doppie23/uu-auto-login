import { useEffect, type FormEvent, useRef, useState } from "react";
import { secureLocalStorage } from "~utils/localStorage";
import VisibleIcon from "~components/icons/VisibleIcon";
import OffVisibleIcon from "~components/icons/OffVisibleIcon";
import uuLogo from "data-base64:~assets/uulogo.png";
import "./style.css";

interface formTarget extends HTMLFormElement {
  username: {
    value: string;
  };
  password: {
    value: string;
  };
  secret: {
    value: string;
  };
}

function IndexPopup() {
  const [buttonText, setButtonText] = useState("Save");
  const [showPassword, setShowPassword] = useState(false);
  const [clearedDataText, setClearedDataText] = useState("");
  const usernameRef = useRef<HTMLInputElement>();

  useEffect(() => {
    secureLocalStorage.getItem("username").then((e) => {
      if (e) usernameRef.current.value = e;
    });
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as formTarget;

    const formData: storageObject = {
      username: target.username.value,
      password: target.password.value,
      secret: target.secret.value,
    };

    for (const key of Object.keys(formData) as storageKey[]) {
      const value = formData[key];
      secureLocalStorage.setItem(key, value);
    }

    setButtonText("Saving...");
    setTimeout(() => {
      setButtonText("Save");
    }, 200);
  };

  return (
    <div className="relative flex h-full items-center justify-center bg-yellow-400">
      <img src={uuLogo} alt="Logo" className="absolute top-6 h-20 w-20" />
      <div className=" w-7/12">
        <h1 className="mb-4 text-center text-3xl font-semibold">UU Login</h1>
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center space-y-2"
        >
          <div className="w-full">
            <div>Naam:</div>
            <input
              ref={usernameRef}
              required
              type="text"
              name="username"
              className="w-full rounded border px-2 py-1"
            />
          </div>
          <div className="w-full">
            <div>Wachtwoord:</div>
            <div className="relative w-full ">
              <button
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="center_eye absolute right-2 h-4 w-4"
                type="button"
              >
                {showPassword ? <OffVisibleIcon /> : <VisibleIcon />}
              </button>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full rounded border px-2 py-1"
              />
            </div>
          </div>
          <div className="w-full">
            <div>2FA secret:</div>
            <input
              required
              type="text"
              autoComplete="off"
              name="secret"
              className="w-full rounded border px-2 py-1"
            />
          </div>
          <button className="w-16 rounded border bg-white p-1 hover:bg-neutral-100 active:bg-neutral-200">
            {buttonText}
          </button>
        </form>
      </div>
      <div className="absolute bottom-2 text-center text-neutral-700 ">
        {clearedDataText && (
          <div className="text-xs font-semibold">{clearedDataText}</div>
        )}
        <button
          onClick={() => {
            secureLocalStorage.clear();
            usernameRef.current.value = "";
            setClearedDataText("Data cleared!");
            setTimeout(() => {
              setClearedDataText("");
            }, 1000);
          }}
          className="hover:text-neutral-500 hover:underline"
        >
          Clear all data
        </button>
      </div>
    </div>
  );
}

export default IndexPopup;
