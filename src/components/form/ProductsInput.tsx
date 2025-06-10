/* eslint-disable @typescript-eslint/no-explicit-any */
import { AutoComplete, AutoCompleteProps } from "antd";
import { FocusEventHandler, Ref, useEffect, useMemo, useState } from "react";
import { TProduct } from "../../types/TProduct.type";
import { useProducts } from "../../hooks/useProducts";

type Props = {
  value?: string;
  ref: Ref<any>;
  onChange: (value?: string, selectedProduct?: TProduct) => void;
  onSelect?: (value: string) => void;
  onBlur: () => void;
};

const ProductsInput = ({ value, ref, onBlur, onChange, onSelect }: Props) => {
  const { distinctProductNames } = useProducts();
  const [options, setOptions] = useState<AutoCompleteProps["options"]>([]);

  const allOptions = useMemo(
    () =>
      distinctProductNames?.map((name) => ({
        value: name,
        label: name,
      })) ?? [],
    [distinctProductNames]
  );

  const handleSearch = (searchValue: string) => {
    onChange(searchValue || undefined);
    setOptions(
      searchValue
        ? allOptions.filter(({ label }) =>
            label?.toString().toLowerCase().includes(searchValue.toLowerCase())
          )
        : allOptions
    );
  };

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    if (onSelect) {
      onSelect(selectedValue);
    }
  };

  const handleChange = (changedValue: string) => {
    if (!changedValue) {
      onChange(undefined);
    }
  };

  const handleBlur: FocusEventHandler = () => {
    if (!options?.some((option) => option.value === value)) {
      onChange(undefined);
    }
    onBlur();
  };

  const handleFocus = () => {
    if (!value) {
      setOptions(allOptions);
    }
  };

  useEffect(() => {
    setOptions(allOptions);
  }, [allOptions]);

  return (
    <AutoComplete
      style={{ width: "min(100%, 400px)" }}
      options={options}
      onBlur={handleBlur}
      value={value}
      ref={ref}
      onFocus={handleFocus}
      onSelect={handleSelect}
      onSearch={handleSearch}
      onChange={handleChange}
      placeholder="Products..."
    />
  );
};

export default ProductsInput;
