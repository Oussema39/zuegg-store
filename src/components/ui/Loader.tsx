import { Spin } from "antd";
import { ComponentProps } from "react";

const Loader = (props: ComponentProps<typeof Spin>) => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-bg-base dark:bg-gray-900">
      <Spin size="large" tip="Loading application..." {...props} />
    </div>
  );
};

export default Loader;
