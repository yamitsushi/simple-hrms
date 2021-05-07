const toolbarConfig = {
  display: [
    "INLINE_STYLE_BUTTONS",
    "BLOCK_STYLE_BUTTONS",
    "BLOCK_ALIGNMENT_BUTTONS",
    "BLOCK_TYPE_BUTTONS",
    "BLOCK_TYPE_DROPDOWN",
    "HISTORY_BUTTONS",
  ],
  INLINE_STYLE_BUTTONS: [
    { label: "Bold", style: "BOLD" },
    { label: "Italic", style: "ITALIC" },
    { label: "StrikeThrough", style: "STRIKETHROUGH" },
    { label: "Monospace", style: "CODE" },
    { label: "Underline", style: "UNDERLINE" },
  ],
  BLOCK_ALIGNMENT_BUTTONS: [
    { label: "Align Left", style: "ALIGN_LEFT" },
    { label: "Align Center", style: "ALIGN_CENTER" },
    { label: "Align Right", style: "ALIGN_RIGHT" },
    { label: "Align Justify", style: "ALIGN_JUSTIFY" },
  ],
  BLOCK_TYPE_BUTTONS: [
    { label: "UL", style: "unordered-list-item" },
    { label: "OL", style: "ordered-list-item" },
    { label: "Blockquote", style: "blockquote" },
  ],
  BLOCK_TYPE_DROPDOWN: [
    { label: "Normal", style: "unstyled" },
    { label: "Heading Large", style: "header-one" },
    { label: "Heading Medium", style: "header-two" },
    { label: "Heading Small", style: "header-three" },
  ],
};

export default toolbarConfig;
