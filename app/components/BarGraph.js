import React, { useMemo } from 'react';
import { useParentSize } from '@visx/responsive';
import { BarStackHorizontal } from '@visx/shape';
import { Group } from '@visx/group';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { useTooltip, Tooltip, defaultStyles } from '@visx/tooltip';
import { getTypeName } from '../../lib/utils/types';
import { getColor } from '../../lib/utils/colors';

const color = '#000';
const background = '#fff';

const defaultMargin = {
	'top': 40,
	'left': 150,
	'right': 40,
	'bottom': 40,
};
const tooltipStyles = {
	...defaultStyles,
	'minWidth': 60,
	'backgroundColor': 'rgba(0,0,0, 0.75)',
	'color': 'white',
};

const dataKey = 'name';
const getName = (playerData) => playerData[dataKey];

export default function BarGraph ({ data, type }) {
	const keys = Object.keys(data.at(0)).filter((key) => key !== dataKey);
	
	const sumValues = useMemo(() => data.reduce((accumulator, playerData) => {
		const sumValue = keys.reduce((playerValue, propertyName) => {
			playerValue += Number(playerData[propertyName]);
			return playerValue;
		}, 0);
		accumulator.push(sumValue);
		return accumulator;
	}, []), [data]);
	
	const yScale = useMemo(() => scaleBand({
		'domain': data.map(getName),
		'padding': 0.2,
	}), [data]);
	const xScale = useMemo(() => scaleLinear({
		'domain': [0, Math.max(...sumValues)],
		'nice': true,
	}), [data]);
	const colorScale = useMemo(() => scaleOrdinal({
		'domain': keys,
		'range': [getColor(type)],
	}), [data]);
	
	const {
		margin = defaultMargin,
		tooltipOpen,
		tooltipLeft,
		tooltipTop,
		tooltipData,
		hideTooltip,
		showTooltip,
	} = useTooltip();
	
	const { parentRef, width, height } = useParentSize({ 'debounceTime': 150 });
	const xMax = width - margin.left - margin.right;
	const yMax = height - margin.top - margin.bottom;
	
	xScale.rangeRound([0, xMax]);
	yScale.rangeRound([yMax, 0]);
	
	return (
		<div ref={parentRef} className="d-flex flex-column flex-grow-1 p-0 mt-3 mb-3">
			<svg width={width} height={height}>
				<rect width={width} height={height} fill={background} rx={14} />
				<Group top={margin.top} left={margin.left}>
					<BarStackHorizontal
						data={data}
						keys={keys}
						height={yMax}
						y={getName}
						yScale={yScale}
						xScale={xScale}
						color={colorScale}
					>
						{(barStacks) => barStacks.map((barStack) => {
							return barStack.bars.map((bar) => (
								<rect
									key={`barstack-horizontal-${barStack.index}-${bar.index}`}
									x={bar.x}
									y={bar.y}
									width={bar.width}
									height={bar.height}
									fill={bar.color}
									onMouseLeave={() => {
										hideTooltip();
									}}
									onMouseMove={(event) => {
										showTooltip({
											'tooltipData': bar,
											'tooltipTop': event?.nativeEvent?.pageY ?? 0,
											'tooltipLeft': event?.nativeEvent?.pageX ?? 0,
										});
									}}
								/>
							));
						})}
					</BarStackHorizontal>
					<AxisLeft
						hideTicks
						numTicks={data.length}
						scale={yScale}
						stroke={color}
						tickStroke={color}
						tickLabelProps={{
							'fill': color,
							'fontSize': 11,
							'textAnchor': 'end',
							'dy': '0.33em',
						}}
					/>
					<AxisBottom
						numTicks={5}
						top={yMax}
						scale={xScale}
						stroke={color}
						tickStroke={color}
						tickLabelProps={{
							'fill': color,
							'fontSize': 11,
							'textAnchor': 'middle',
						}}
					/>
				</Group>
			</svg>
			{tooltipOpen && tooltipData && (
				<Tooltip top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
					<div style={{ 'color': colorScale(tooltipData.key) }}>
						<strong>{getTypeName(tooltipData.key)}</strong>
					</div>
					<div>{tooltipData.bar.data[tooltipData.key]}</div>
					<div>
						<small>{getName(tooltipData.bar.data)}</small>
					</div>
				</Tooltip>
			)}
		</div>
	);
}
