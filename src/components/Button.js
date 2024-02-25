import React ,{useRef, useState} from 'react'
import Form from "./Form"

export default function Button() {
  const [showComponent, setShowComponent] = useState(false);
  return (
    <div>
      <button id="newrow" type="submit" onClick={() => setShowComponent(true)}>
        Add Row
      </button>
      {showComponent && <Form />}
    </div>
  )
}
