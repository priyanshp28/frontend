import React ,{useRef, useState} from 'react'

export default function Button() {
    const addRow=()=>{

    }
  return (
    <div>
      <button id="newrow" type="submit" onClick={addRow}>
        Add Row
      </button>
      <button id="newrow" type="submit" onClick={addRow}>
        Send Data
      </button>
    </div>
  )
}
