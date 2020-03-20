import React from "react"
import { Observable } from "rxjs"
import { Text, TextProps } from "react-native"
import { useRx } from "@roborox/focal-react/build/src/use-rx"

export interface RxTextProps<T> extends TextProps {
	value: Observable<T | void | null>
}

export function RxText<T extends string | number>({ value, ...rest }: RxTextProps<T>) {
	const raw = useRx(value)

	if (raw) {
		return <Text {...rest}>{raw}</Text>
	}
	return null
}