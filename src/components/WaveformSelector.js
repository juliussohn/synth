import React from "react";
import styled from "styled-components";
import { bindActionCreators } from "redux";
import { setParam } from "../actions/actions.js";

import { connect } from "react-redux";

const trackHeight = 80;
const Container = styled.div`
	display: flex;
	height: ${trackHeight}px;
	justify-content: center;
`;

const Labels = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin-left: 10px;
`;

const Track = styled.div`
	cursor: pointer;
	height: 100%;
	width: 20px;
	background: #111111;
	box-shadow: inset 0 1px 0 0 rgba(0, 0, 0, 0.5),
		inset 0 -1px 0 0 rgba(255, 255, 255, 0.16);
	border-radius: 10px;
`;
const Knob = styled.div`
	cursor: pointer;
	width: 20px;
	height: 20px;
	border-radius: 100%;
	background-image: linear-gradient(180deg, #4d4d4d 0%, #1c1c1c 99%);
	box-shadow: 0 5px 3px 0 rgba(0, 0, 0, 0.19), 0 8px 7px 0 rgba(0, 0, 0, 0.5),
		inset 0 -1px 0 0 rgba(0, 0, 0, 0.5),
		inset 0 1px 0 0 rgba(255, 255, 255, 0.16);
	position: relative;
	transition: all 0.2s;
	touch-action: none;
`;

const ShapeImage = styled.div`
	cursor: pointer;
`;

const shapeSVG = {
	sine: (
		<svg
			width="20px"
			height="11px"
			viewBox="0 0 20 11"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g
				id="Artboard"
				stroke="none"
				strokeWidth="1"
				fill="none"
				fillRule="evenodd"
				strokeLinecap="round"
			>
				<path
					d="M19,5.5 C19,7.985 16.985,10 14.5,10 C12.015,10 10,7.985 10,5.5 C10,3.015 7.985,1 5.5,1 C3.015,1 1,3.015 1,5.5"
					id="Stroke-1"
					stroke="#C6C6C6"
				></path>
			</g>
		</svg>
	),
	triangle: (
		<svg
			width="20px"
			height="11px"
			viewBox="0 0 20 11"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g
				id="Artboard-Copy-36"
				stroke="none"
				strokeWidth="1"
				fill="none"
				fillRule="evenodd"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<polyline
					id="Path-4"
					stroke="#C6C6C6"
					points="1 10 10 1 19 10"
				></polyline>
			</g>
		</svg>
	),
	sawtooth: (
		<svg
			width="20px"
			height="11px"
			viewBox="0 0 20 11"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g
				id="Artboard-Copy-38"
				stroke="none"
				strokeWidth="1"
				fill="none"
				fillRule="evenodd"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<polyline
					id="Path-7"
					stroke="#C6C6C6"
					points="1 10 19 1 19 10"
				></polyline>
			</g>
		</svg>
	),
	square: (
		<svg
			width="20px"
			height="11px"
			viewBox="0 0 20 11"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g
				id="Artboard-Copy-37"
				stroke="none"
				strokeWidth="1"
				fill="none"
				fillRule="evenodd"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<polyline
					id="Path-5-Copy"
					stroke="#C6C6C6"
					points="1 10 1 1 10 1 10 10 19 10"
				></polyline>
			</g>
		</svg>
	),
};

class WaveformSelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};

		this.shapes = ["sine", "triangle", "sawtooth", "square"];
		this.audio = new Audio("/sounds/switch.mp3");
	}

	componentDidMount() {
		document.addEventListener("mousemove", this.onMouseMove.bind(this), false);
		document.addEventListener("mouseup", this.onMouseUp.bind(this), false);
		document.addEventListener("touchmove", this.onMouseMove.bind(this), false);
		document.addEventListener("touchend", this.onMouseUp.bind(this), false);
	}
	componentWillUnmount() {
		document.removeEventListener("mousemove", this.onMouseMove, false);
		document.removeEventListener("mouseup", this.onMouseUp, false);
		document.removeEventListener("touchmove", this.onMouseMove, false);
		document.removeEventListener("touchend", this.onMouseUp, false);
	}

	select(type) {
		const { module, moduleIndex } = this.props;
		const audio = new Audio("/sounds/switch.mp3");
		audio.play();
		this.props.setParam(module, moduleIndex, "type", type);
	}

	getShapes() {
		return this.shapes.map((s, i) => (
			<ShapeImage
				key={`${this.props.moduleIndex}shape_${i}`}
				onClick={(e) => {
					this.select(s);
				}}
			>
				{shapeSVG[s]}
			</ShapeImage>
		));
	}

	getIndex(type) {
		return this.shapes.indexOf(type);
	}

	onMouseDown(event) {
		const dragStartY = event.clientY || event.touches[0].clientY;
		this.setState({
			dragStartY,
			dragging: true,
			freezeValue: this.props.value,
		});
	}

	onMouseMove(event) {
		if (!this.state.dragging) return;
		const clientY = event.clientY || event.touches[0].clientY;
		const delta = this.state.dragStartY - clientY;

		const stepSize = trackHeight / this.shapes.length;

		//if (Math.abs(delta / stepSize) > 1) {
		const diff = -1 * Math.round(delta / stepSize);
		let newVal = this.getIndex(this.state.freezeValue) + diff;

		if (
			newVal > -1 &&
			newVal < this.shapes.length &&
			this.shapes[newVal] !== this.props.value
		) {
			console.log(this.shapes[newVal], this.props.value);

			this.select(this.shapes[newVal]);
		}
		//  }
	}
	onMouseUp(event) {
		this.setState({
			dragging: false,
		});
	}

	handleTrackClick(e) {
		var bb = e.target.getBoundingClientRect();

		const newVal = Math.floor(
			(e.clientY - bb.top) / (trackHeight / this.shapes.length)
		);

		if (this.shapes[newVal] !== this.props.value) {
			this.select(this.shapes[newVal]);
		}
	}

	render() {
		const { value } = this.props;

		return (
			<Container>
				<Track onClick={this.handleTrackClick.bind(this)}>
					<Knob
						onClick={(e) => {
							e.stopPropagation();
							return false;
						}}
						onTouchStart={this.onMouseDown.bind(this)}
						onMouseDown={this.onMouseDown.bind(this)}
						style={{ top: this.getIndex(value) * 25 + "%" }}
					></Knob>
				</Track>
				<Labels>{this.getShapes()}</Labels>
			</Container>
		);
	}
}

WaveformSelector.defaultProps = {
	value: "sine",
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ setParam }, dispatch);
};
export default connect(null, mapDispatchToProps)(WaveformSelector);

/*  <br />
                <Select active={value === 'sine'} onClick={() => { this.select('sine') }}>

                    <svg width="34px" height="18px" viewBox="0 0 34 18" version="1.1"  >
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round">
                            <g id="Group-3" transform="translate(1.000000, 1.000000)" strokeWidth="2">
                                <path d="M16,8 C16,3.581722 12.4181687,0 7.99992957,0 C3.58169047,0 0,3.581722 0,8" id="Path"></path>
                                <path d="M32,8 C32,12.418278 28.4181687,16 23.9999296,16 C19.5816905,16 16,12.418278 16,8" id="Path"></path>
                            </g>
                        </g>
                    </svg>
                </Select>

                <Select active={value === 'triangle'} onClick={() => { this.select('triangle') }}>
                    <svg width="34px" height="18px" viewBox="0 0 34 18" version="1.1"  >
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                            <polyline id="Path-4" strokeWidth="2" points="1 17 17 1 33 17"></polyline>
                        </g>
                    </svg>
                </Select>

                <Select active={value === 'sawtooth'} onClick={() => { this.select('sawtooth') }}>

                    <svg width="38px" height="20px" viewBox="0 0 38 20" version="1.1" >
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                            <polyline id="Path-7" strokeWidth="2" points="1 19 37 1 37 19"></polyline>
                        </g>
                    </svg>
                </Select>
                <Select active={value === 'square'} onClick={() => { this.select('square') }}>

                    <svg width="38px" height="20px" viewBox="0 0 38 20" version="1.1"  >
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                            <polyline id="Path-5-Copy" strokeWidth="2" points="1 19 1 1 19 1 19 19 37 19"></polyline>
                        </g>
                    </svg>
                </Select>
 */
