import React, { ChangeEvent, useState } from "react";

const DocumentHeaderProperty = () => {
  const types = ["Text", "Number", "Select", "Date", "Image", "File"];
  const [value, setValue] = useState(types[0]);
  const [choice, setChoice] = useState<unknown[]>([
    <input type="text" className="choices" required />,
    <input type="text" className="choices" required />,
  ]);
  const [imageSrc, setImageSrc] = useState<React.SetStateAction<any>>();
  const [uploadData, setUploadData] = useState();
  const type = types.map((el) => <option value={el}>{el}</option>);
  function handleSelect(e: ChangeEvent<HTMLSelectElement>) {
    setValue(e.target.value);
  }

  function handleImagePreview(e: any) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target?.result);
      setUploadData(undefined);
    };
    reader.readAsDataURL(e.target.files[0]);
  }
  return (
    <div className="property-box">
      <div className="form__group field">
        <input
          type="text"
          className="form__field propertyName"
          placeholder="value"
          name="value"
          id="value"
          required
        />
        <label htmlFor="value" className="form__label">
          Property Name
        </label>
      </div>

      <select onChange={(e) => handleSelect(e)} className="valueType">
        {type}
      </select>

      <button onClick={(e) => e.currentTarget.parentElement?.remove()}>
        <svg
          height="20px"
          width="20px"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 26.00 26.00"
          xmlSpace="preserve"
          fill="#000000"
          stroke="#000000"
          strokeWidth="0.00026000000000000003"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />

          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <g id="SVGRepo_iconCarrier">
            {" "}
            <g>
              {" "}
              <path
                fill="#ff0000"
                stroke="#ffffff"
                d="M21.125,0H4.875C2.182,0,0,2.182,0,4.875v16.25C0,23.818,2.182,26,4.875,26h16.25 C23.818,26,26,23.818,26,21.125V4.875C26,2.182,23.818,0,21.125,0z M18.78,17.394l-1.388,1.387c-0.254,0.255-0.67,0.255-0.924,0 L13,15.313L9.533,18.78c-0.255,0.255-0.67,0.255-0.925-0.002L7.22,17.394c-0.253-0.256-0.253-0.669,0-0.926l3.468-3.467 L7.221,9.534c-0.254-0.256-0.254-0.672,0-0.925l1.388-1.388c0.255-0.257,0.671-0.257,0.925,0L13,10.689l3.468-3.468 c0.255-0.257,0.671-0.257,0.924,0l1.388,1.386c0.254,0.255,0.254,0.671,0.001,0.927l-3.468,3.467l3.468,3.467 C19.033,16.725,19.033,17.138,18.78,17.394z"
              />{" "}
            </g>{" "}
          </g>
        </svg>
      </button>
      {value === "Select" && (
        <div className="add-choices">
          <p>Options</p>
          {choice}
          <button
            onClick={() =>
              setChoice([
                ...choice,
                <input type="text" className="choices" required />,
              ])
            }
          >
            + Option
          </button>
        </div>
      )}
      {value === "Image" && (
        <>
          <input type="file" name="file" onChange={handleImagePreview} />

          <img src={imageSrc} />
        </>
      )}
    </div>
  );
};

export default DocumentHeaderProperty;
