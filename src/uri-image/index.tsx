import React from "react"
import { ImageProps, Image } from "react-native"
import { Observable } from "rxjs"
import { useRx } from "@roborox/focal-react/build/src/use-rx"

export interface RxUriImageProps extends ImageProps {
	uri: Observable<string | number | undefined | null | void>,
}

export function RxUriImage({ uri, ...restProps }: RxUriImageProps) {
	const raw = useRx(uri)

	if (raw) {
		return <Image source={{ uri }} {...restProps} />
	}
	return null
}