import { useEffect, type FormEvent, useRef } from "react";
import "./style.css";

interface formTarget extends HTMLFormElement {
  naam: {
    value: string;
  };
  wachtwoord: {
    value: string;
  };
  secret: {
    value: string;
  };
}

function IndexPopup() {
  const naamRef = useRef<HTMLInputElement>();

  useEffect(() => {
    chrome.storage.local.get("naam").then((e) => {
      console.log(e.naam);
      if (e.naam) {
        naamRef.current.value = e.naam;
      }
    });
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as formTarget;

    const formData = {
      naam: target.naam.value,
      wachtwoord: target.wachtwoord.value,
      secret: target.secret.value,
    };

    for (const [key, value] of Object.entries(formData)) {
      chrome.storage.local.set({ [key]: value });
    }
  };

  return (
    <div className="flex h-full items-center justify-center bg-yellow-400">
      <div>
        <h1 className="mb-4 text-center text-3xl font-semibold">UU Login</h1>
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center space-y-2"
        >
          <div>
            <div>Naam:</div>
            <input
              ref={naamRef}
              required
              type="text"
              name="naam"
              className="rounded border px-1"
            />
          </div>
          <div>
            <div>Wachtwoord:</div>
            <input
              required
              type="password"
              name="wachtwoord"
              className="rounded border px-1"
            />
          </div>
          <div>
            <div>2FA secret:</div>
            <input
              required
              type="text"
              name="secret"
              className="rounded border px-1"
            />
          </div>
          <button className="w-16 rounded border bg-white p-1 hover:bg-gray-100">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default IndexPopup;
