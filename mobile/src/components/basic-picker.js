import React from 'react'
import {Picker} from '@react-native-picker/picker'
import {StyleSheet} from 'react-native'
import {sizes} from "../constants";

function BasicPicker({
                         items = [],
                         placeholder,
                         style,
                         enabled,
                         onChange = () => {},
                         ...props
                     }) {
    return (
        <Picker
            {...props}
            enabled={enabled}
            onValueChange={(item) => onChange(item)}
            style={style}
        >
            {items.map((item) => (
                <Picker.Item style={styles.item} key={item.value} label={item.label} value={item.value}/>
            ))}
        </Picker>
    )
}

const styles = StyleSheet.create({
    item: {
        fontFamily: 'latoRegular',
        fontSize: sizes.input,
    }
})

export default BasicPicker
