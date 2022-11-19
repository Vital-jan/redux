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
        key={i}
      />
    );
    console.log(props.data[i]);
  }
  return <div className="main">{components}</div>;
};

const Enable = (props) => {
  const content = props.enable ? "+" : "-";
  const css = props.enable ? "" : "disable";
  return (
    <span
      className={"enable " + css}
      onClick={() => props.setEnable(!props.enable)}
    >
      <span>{content}</span>
    </span>
  );
};

const Item = (props) => {
  const [myRate, setMyRate] = useState();
  const [active, setActive] = useState(false);
  const [enable, setEnable] = useState(true);

  if (!props.admin) {
    // user mode:
    if (!enable) return null;
    return (
      <div className="item">
        <span className="item-col description"> {props.description}&nbsp;</span>
        <span className="item-col code">{props.code}&nbsp;</span>
        <span className="item-col rate">{props.rate}&nbsp;</span>
        <span className="item-col my-rate">{myRate}&nbsp;</span>
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
    const css = active ? " active" : "";

    return (
      <div className="item-edit">
        <input
          className={"select" + css}
          value={""}
          onChange={() => {}}
          onFocus={(e) => {
            setActive(true);
          }}
          onBlur={(e) => {
            setActive(false);
          }}
        />
        <input
          className="input description"
          value={props.description}
          onChange={() => {}}
        />
        <input
          className="input code"
          type="text"
          value={props.code}
          onChange={(e) => {}}
        />
        <input
          className="input rate"
          type="text"
          value={props.rate}
          onChange={(e) => {}}
        />
        <input
          className="input my-rate"
          type="text"
          value={myRate}
          onChange={(e) => {
            setMyRate(e.target.value);
          }}
        />
        <Enable enable={enable} setEnable={setEnable} />
        {up}
      </div>
    );
  }
};

export default App;
