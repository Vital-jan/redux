import { useEffect, useState } from "react";
import "./App.scss";
import axios from "axios";

const getJson = async () => {
  await axios
    .post("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
    .then((resp) => {
      if (resp.data) {
      } else console.log("no data");
    })
    .catch((err) => {
      console.log("error load json");
    });
};

function App() {
  const [admin, setAdmin] = useState(false); // admin mode

  useEffect(() => {
    getJson();
  }, []);

  console.log("render");
  return (
    <div className="App">
      <div className="header">
        <h2>Currency rate</h2>
        <div className="admin">
          <Admin admin={admin} setAdmin={setAdmin} />
        </div>
      </div>
      <Main admin={admin} />
    </div>
  );
}

const Admin = (props) => {
  // header containing admin buttons
  if (props.admin)
    return (
      <div>
        <button
          onClick={() => {
            props.setAdmin(false);
          }}
        >
          Save
        </button>
        <button
          onClick={() => {
            props.setAdmin(false);
          }}
        >
          Exit
        </button>
      </div>
    );

  return (
    <div>
      <button
        onClick={() => {
          props.setAdmin(true);
        }}
      >
        Admin mode
      </button>
    </div>
  );
};

const Main = (props) => {
  // main section
  return <div className="main">Main</div>;
};

const Item = (props) => {
  const [description, setDescription] = useState(props.description);
  const [code, setCode] = useState(props.code);
  const [value, setValue] = useState(props.value);

  if (!props.admin) {
    // user mode:
    return (
      <div className="item">
        <span className="item-description"> {description}&nbsp;</span>
        <span className="item-code">{code}&nbsp;</span>
        <span className="item-value">{value}&nbsp;</span>
      </div>
    );
  }
  if (props.admin) {
    const up =
      +props.id > 0 ? (
        <span
          className="up"
          onClick={(e) => {
            props.shift(props.id);
            props.reload();
          }}
        >
          &uarr;
        </span>
      ) : null;
    return (
      <div className="ip-edit-item">
        <input
          className="input"
          type="text"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <input
          className="input"
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
          }}
        />
        <input
          className="input"
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        {up}
      </div>
    );
  }
};

export default App;
