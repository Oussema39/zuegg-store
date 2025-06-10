import { Button } from "antd";
import { Controller, useForm } from "react-hook-form";
import ProductsInput from "../form/ProductsInput";

type TFormInput = {
  product?: string;
};

type Props = {
  onSubmit: (value: string) => void;
  onReset: () => void;
  isLoading?: boolean;
};

const DashboardFilter = ({ onSubmit, onReset }: Props) => {
  const { control, reset } = useForm<TFormInput>();

  return (
    <form className="flex items-center gap-2">
      <Controller
        control={control}
        name="product"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <ProductsInput
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            ref={ref}
            onSelect={onSubmit}
          />
        )}
      />
      <Button
        onClick={() => {
          onReset();
          reset();
        }}
        danger
      >
        Reset
      </Button>
    </form>
  );
};

export default DashboardFilter;
