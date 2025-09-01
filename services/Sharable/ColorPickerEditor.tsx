
import React from 'react'
import { ChromePicker, CirclePicker } from "react-color"
interface ColorPickerEditor {
    value: string;
    onColorChange: (val: string) => void

}
const ColorPickerEditor = ({ value, onColorChange }: ColorPickerEditor) => {
    return (
        <div className='space-y-4'>
            <ChromePicker
                color={value}
                className='border-r rounded-2xl mb-5'
                onChange={(event) => {
                    onColorChange(event.hex)
                }}
            />
            <CirclePicker
                color={value}
                onChange={(event) => {
                    onColorChange(event.hex)
                }}
            />
        </div>
    )
}

export default ColorPickerEditor
