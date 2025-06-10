import { ThemeConfig, theme } from "antd";

export const antConfig = (
  isDark: boolean,
  _theme: typeof theme
): ThemeConfig => ({
  algorithm: isDark ? _theme.darkAlgorithm : _theme.defaultAlgorithm,
  token: {
    colorPrimary: "#1890ff",
    colorSuccess: "#52c41a",
    colorWarning: "#faad14",
    colorError: "#f5222d",
    colorInfo: "#1890ff",
    borderRadius: 6,
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  },
});
