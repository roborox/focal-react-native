import React from "react"
import { TextInput, TextInputProps } from "react-native"
import { useRx } from "@roborox/focal-react/build/src/use-rx"
import { Atom } from "@grammarly/focal"

export interface RxTextInputProps extends Omit<TextInputProps, "value" | "onChangeText"> {
	value: Atom<string | void | null | undefined>
}

export function RxTextInput({value, ...restProps}: RxTextInputProps): React.ReactElement | null {
	const text = useRx(value)

	return (
		<TextInput
			{...restProps}
			onChangeText={text => value.set(text)}
			value={text || ""}
		/>
	)
}
