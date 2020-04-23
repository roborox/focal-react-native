import React, { useCallback } from "react"
import { FlatList, FlatListProps, ListRenderItemInfo } from "react-native"
import { Observable, of } from "rxjs"
import { useRx } from "@roborox/focal-react/build/src/use-rx"

export interface RxListRenderItemInfo<T> extends ListRenderItemInfo<T> {
	first: boolean
	last: boolean
}

export type RxListRenderItem<T> = (info: RxListRenderItemInfo<T>) => React.ReactElement | null

export interface RxFlatListProps<T> extends Omit<FlatListProps<T>, "data" | "renderItem" | "refreshControl" | "refreshing"> {
	data: Observable<T[] | undefined | null>
	renderItem: RxListRenderItem<T>
	refreshing?: Observable<boolean>
}

export function RxFlatList<T>({
	data, renderItem: render, refreshing = of(false), ...rest
}: RxFlatListProps<T>): React.ReactElement | null {
	const list = useRx(data)
	const isRefreshing = useRx(refreshing, false)

	const renderItem = useCallback((x: ListRenderItemInfo<T>) => render({
		...x,
		first: x.index === 0,
		last: x.index + 1 === list?.length,
	}), [list])

	if (list) {
		return <FlatList data={list} renderItem={renderItem} refreshing={isRefreshing} {...rest} />
	}
	return null
}
