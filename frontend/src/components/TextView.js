import React from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';

export default function TextView(props) {

  return (
    <MarkdownPreview source={props.text} style={{ padding: 16 }} />
  )
}