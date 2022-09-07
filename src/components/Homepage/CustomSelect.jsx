import React, { useEffect, useState } from "react";
import Select from "react-select";

const CustomSelect = ({ options, defaultValue, onChange }) => {
  return (
    <div className="select-news-category">
      <Select
        options={options}
        placeholder="Select your news"
        isSearchable={false}
        defaultValue={options?.filter((item) => item?.value === defaultValue)}
        onChange={onChange}
        formatOptionLabel={(item) => (
          <div className="select-custom-option">
            {item.img && <img src={item.img} alt="country-image" />}
            <span>{item.label}</span>
          </div>
        )}
      />
    </div>
  );
};

export default CustomSelect;
