import { useEffect, useState } from "react";
import "./App.scss";
import axios from "axios";

const getJson = async (setData) => {
  await axios
    .get("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
    .then((resp) => {
      if (resp.data) {
        setData(resp.data);
      } else console.log("no data");
    })
    .catch((err) => {
      console.log("error load json");
    });
};

function App() {
  const [admin, setAdmin] = useState(false); // admin mode
  const [data, setData] = useState([]);

  useEffect(() => {
    getJson(setData);
  }, []);

  console.log("render");
  if (!data.length) return null;
  return (
    <div className="App">
      <div className="header">
        <h2>Currency rate</h2>
        <div className="admin">
          <Admin admin={admin} setAdmin={setAdmin} />
        </div>
      </div>
      <Main admin={admin} data={data} />
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
  console.log(props.data);
  // main section
  let components = [];
  for (let i = 0; i < 5; i++) {
    components.push(
      <Item
        admin={props.admin}
        description={props.data[i].txt}
        code={props.data[i].cc}
        rate={props.data[i].rate}
      />
    );
    console.log(props.data[i]);
  }
  return <div className="main">{components}</div>;
};

const Item = (props) => {
  const [description, setDescription] = useState(props.description);
  const [code, setCode] = useState(props.code);
  const [rate, setRate] = useState(props.rate);
  const [active, setActive] = useState(false);

  const Active = (props) => {
    if (!props.active) return null;
    return <span>(!)</span>;
  };

  if (!props.admin) {
    // user mode:
    return (
      <div className="item">
        <span className="item-description"> {description}&nbsp;</span>
        <span className="item-code">{code}&nbsp;</span>
        <span className="item-value">{rate}&nbsp;</span>
      </div>
    );
  }
  if (props.admin) {
    const up =
      +props.id > 0 ? (
        <span className="up" onClick={(e) => {}}>
          &uarr;
        </span>
      ) : null;
    return (
      <div className="item-edit">
        <Active active={active} />
        <input
          className="input"
          value={description}
          onBlur={(e) => {
            setActive(true);
          }}
          onFocusOut={(e) => {
            setActive(false);
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
          value={rate}
          onChange={(e) => {
            setRate(e.target.value);
          }}
        />
        {up}
      </div>
    );
  }
};

export default App;
