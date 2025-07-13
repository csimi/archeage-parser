import React, { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import Container from 'react-bootstrap/Container';
import useStatistics from '../store/statistics';
import LogParser from '../../lib/LogParser';

const baseStyle = {
	'flex': 1,
	'display': 'flex',
	'flexDirection': 'column',
	'alignItems': 'center',
	'padding': '20px',
	'borderWidth': 2,
	'borderRadius': 2,
	'borderColor': '#eeeeee',
	'borderStyle': 'dashed',
	'backgroundColor': '#fafafa',
	'color': '#bdbdbd',
	'outline': 'none',
	'transition': 'border .24s ease-in-out',
};

const focusedStyle = {
	'borderColor': '#2196f3',
};

const acceptStyle = {
	'borderColor': '#00e676',
};

const rejectStyle = {
	'borderColor': '#ff1744',
};

const isProcessing = true;

export default function FileDropper () {
	const { setStatistics, clearStatistics } = useStatistics();
	const onDrop = useCallback(async (acceptedFiles) => {
		if (acceptedFiles.length !== 1) {
			return;
		}
		
		const file = acceptedFiles.at(0);
		const readable = file.stream();
		
		try {
			clearStatistics(isProcessing, {});
			await new Promise((resolve) => setTimeout(resolve, 1));
			const parser = new LogParser(readable);
			await parser.parseData();
			const data = parser.getData();
			setStatistics(data);
		}
		catch (err) {
			clearStatistics(!isProcessing);
			console.debug('Processing error');
			console.trace(err);
		}
	}, []);
	
	const {
		getRootProps,
		getInputProps,
		isFocused,
		isDragAccept,
		isDragReject,
	} = useDropzone({ onDrop });
	
	const style = useMemo(() => ({
		...baseStyle,
		...(isFocused ? focusedStyle : {}),
		...(isDragAccept ? acceptStyle : {}),
		...(isDragReject ? rejectStyle : {}),
	}), [
		isFocused,
		isDragAccept,
		isDragReject,
	]);
	
	return (
		<Container className="d-flex flex-column flex-grow-1 justify-content-center pt-5 pb-5">
			<div {...getRootProps({ style })}>
				<input {...getInputProps()} />
				<p>Drag &apos;n&apos; drop a combat log here, or click to select the file</p>
			</div>
		</Container>
	);
}
