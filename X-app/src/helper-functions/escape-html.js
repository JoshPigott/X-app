function escapeHtml(text) {
  return text
    .replace("&", "&amp;")
    .replace("<", "&lt;")
    .replace(">", "&gt;")
    .replace('"', "&quot;")
    .replace("'", "&3x27;");
}
export default escapeHtml;
