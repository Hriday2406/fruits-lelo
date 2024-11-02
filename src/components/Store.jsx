import Icon from "@mdi/react";
import { mdiChevronDown, mdiChevronUp, mdiWindowClose } from "@mdi/js";
import { Checkbox, ConfigProvider } from "antd";
import { useState } from "react";

function Tags({ text, onClick }) {
  return (
    <div className="flex select-none items-center gap-1 rounded-full bg-accent px-3 py-1 font-mono text-xs font-black text-black">
      <span className="">{text}</span>
      <Icon
        path={mdiWindowClose}
        size={0.6}
        className="cursor-pointer transition-all hover:scale-150"
        onClick={() => {
          console.log("test");
        }}
      />
    </div>
  );
}

function ColorCheckBox({ color }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: color,
          colorText: "#fff",
          fontFamily: "Roboto",
          colorBgContainer: color,
          colorBorder: color,
          borderRadiusSM: 50,
          controlInteractiveSize: 25,
          colorWhite: color == "Yellow" || color == "Orange" ? "#000" : "#fff",
        },
      }}
    >
      <Checkbox
        className="flex w-1/4 flex-col items-center justify-center gap-2"
        value={color}
      >
        {color}
      </Checkbox>
    </ConfigProvider>
  );
}

function Aside() {
  const colorOptions = [
    "Purple",
    "Green",
    "Brown",
    "Red",
    "Orange",
    "Yellow",
    "Blue",
    "Black",
  ];
  const familyOptions = [
    { label: "Rose", value: "Rose" },
    { label: "Citrus", value: "Citrus" },
    { label: "Nightshade", value: "Nightshade" },
    { label: "Gourd", value: "Gourd" },
    { label: "Palm", value: "Palm" },
    { label: "Cashew", value: "Cashew" },
    { label: "Berry", value: "Berry" },
    { label: "Laurel", value: "Laurel" },
    { label: "Other", value: "Other" },
  ];
  const vitaminsOptions = [
    { label: "Vitamin C", value: "C" },
    { label: "Vitamin A", value: "A" },
    { label: "Vitamin K", value: "K" },
    { label: "Vitamin E", value: "E" },
    { label: "Vitamin B6", value: "B6" },
  ];

  const [filters, setFilters] = useState([]);
  const [families, setFamilies] = useState([]);
  const [isColorOpen, setIsColorOpen] = useState(true);
  const [isFamilyOpen, setIsFamilyOpen] = useState(true);
  const [isVitaminOpen, setIsVitaminOpen] = useState(true);

  function handleFamilyChange(checkedValues) {
    console.log(checkedValues);
  }
  function handleVitaminsChange(checkedValues) {
    console.log(checkedValues);
  }

  return (
    <div className="w-72 p-10">
      <div className="">
        <div className="flex items-center justify-between bg-bg">
          <h1 className="text-2xl font-bold">Color</h1>
          <Icon
            path={isColorOpen ? mdiChevronDown : mdiChevronUp}
            size={1}
            color="#ae9b84"
            className="cursor-pointer transition-all hover:scale-125"
            onClick={() => {
              setIsColorOpen((prev) => !prev);
            }}
          />
        </div>
        <div
          className={`m-6 origin-top transition-all duration-500 ${isColorOpen ? "" : "scale-y-0"}`}
        >
          <Checkbox.Group onChange={handleFamilyChange} className="flex gap-5">
            {colorOptions.map((color, index) => (
              <ColorCheckBox color={color} key={color + index} />
            ))}
          </Checkbox.Group>
        </div>
      </div>
      <div className="">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Family</h1>
          <Icon
            path={isFamilyOpen ? mdiChevronDown : mdiChevronUp}
            size={1}
            color="#ae9b84"
            className="cursor-pointer transition-all hover:scale-125"
            onClick={() => {
              setIsFamilyOpen((prev) => !prev);
            }}
          />
        </div>
        <div className="m-6">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#ae9b84",
                colorText: "#fff",
                fontFamily: "Roboto",
                colorBgContainer: "#0f0f0f",
                colorBorder: "#ae9b84",
                borderRadiusSM: 0,
              },
            }}
          >
            <Checkbox.Group
              options={familyOptions}
              defaultValue={[]}
              className={`flex origin-top flex-col gap-5 transition-all duration-500 ${isFamilyOpen ? "" : "scale-y-0"}`}
              onChange={handleFamilyChange}
            />
          </ConfigProvider>
        </div>
      </div>
      <div className="">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Vitamins</h1>
          <Icon
            path={isVitaminOpen ? mdiChevronDown : mdiChevronUp}
            size={1}
            color="#ae9b84"
            className="cursor-pointer transition-all hover:scale-125"
            onClick={() => {
              setIsVitaminOpen((prev) => !prev);
            }}
          />
        </div>
        <div className="m-6 flex flex-col gap-5">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#ae9b84",
                colorText: "#fff",
                fontFamily: "Roboto",
                colorBgContainer: "#0f0f0f",
                colorBorder: "#ae9b84",
                borderRadiusSM: 0,
              },
            }}
          >
            <Checkbox.Group
              options={vitaminsOptions}
              defaultValue={[]}
              className={`flex origin-top flex-col gap-5 transition-all duration-500 ${isVitaminOpen ? "" : "scale-y-0"}`}
              onChange={handleVitaminsChange}
            />
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
}

export default function Store() {
  return (
    <section className="flex">
      <Aside />
      <div className="flex flex-col items-start gap-5 pr-10 pt-10">
        <h1 className="text-2xl font-bold">Items ( {25} )</h1>
        <div className="flex gap-3"></div>
      </div>
    </section>
  );
}
