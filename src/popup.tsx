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
  const [isTfaSecretSet, setIsTfaSecretSet] = useState(false);
  const [clearedDataText, setClearedDataText] = useState("");
  const usernameRef = useRef<HTMLInputElement>();

  useEffect(() => {
    secureLocalStorage.getItem("username").then((e) => {
      if (e) usernameRef.current.value = e;
    });
    secureLocalStorage.getItem("secret").then((e) => {
      if (e) setIsTfaSecretSet(true);
    });
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as formTarget;

    const formData: storageObject = {
      username: target.username.value,
      password: target.password.value,
      secret: isTfaSecretSet ? target.secret.value : undefined,
    };

    for (const key of Object.keys(formData) as storageKey[]) {
      const value = formData[key];
      if (value) secureLocalStorage.setItem(key, value);
    }

    setButtonText("Saved!");
    setTimeout(() => {
      setButtonText("Save");
    }, 200);
  };

  return (
    <div className="relative flex h-full items-center justify-center bg-yellow-400">
      <img src={uuLogo} alt="Logo" className="absolute top-6 h-20 w-20" />
      <div className=" w-7/12">
        <h1 className="mb-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          UU Login
        </h1>
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center space-y-2"
        >
          <div className="w-full">
            <label>Name:</label>
            <input
              ref={usernameRef}
              required
              type="text"
              name="username"
              className="w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black"
            />
          </div>
          <div className="w-full">
            <label>Password:</label>
            <div className="relative w-full ">
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black"
              />
              <button
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2"
                type="button"
              >
                <div className="fill-zinc-500">
                  {showPassword ? <OffVisibleIcon /> : <VisibleIcon />}
                </div>
              </button>
            </div>
          </div>
          <div className="w-full">
            <label>
              2FA secret:
              {isTfaSecretSet && (
                <span className="text-[0.6rem] text-zinc-500">
                  {" "}
                  (Not required, already set)
                </span>
              )}
            </label>
            <input
              required={!isTfaSecretSet}
              type="text"
              autoComplete="off"
              name="secret"
              className="w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black"
            />
          </div>
          <button className="w-16 rounded-md border bg-white p-1 shadow-sm hover:bg-zinc-100 active:bg-zinc-200">
            {buttonText}
          </button>
        </form>
      </div>
      <div className="absolute bottom-2 text-center text-zinc-500 ">
        {clearedDataText && (
          <div className="text-xs font-semibold">{clearedDataText}</div>
        )}
        <button
          onClick={() => {
            secureLocalStorage.clear();
            usernameRef.current.value = "";
            setIsTfaSecretSet(false);
            setClearedDataText("Data cleared!");
            setTimeout(() => {
              setClearedDataText("");
            }, 1000);
          }}
          className="hover:text-zinc-700 hover:underline"
        >
          Clear all data
        </button>
      </div>
    </div>
  );
}

export default IndexPopup;
