import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { onboardingReset } from "../actions/actions.js";
import { motion, AnimatePresence } from "framer-motion";
import { store } from "../store";

const Container = styled.div`
	text-transform: uppercase;
	font-size: 12px;

	letter-spacing: 2px;
	position: absolute;
	bottom: 20px;
	display: flex;
	justify-content: space-between;
	left: 20px;
	right: 20px;
	span {
		opacity: 0.4;
	}
	a {
		opacity: 0.4;
		color: white;
		text-decoration: none;
		display: inline-block;
		border-bottom: 1px dashed;
		cursor: pointer;
		&:hover {
			opacity: 0.8;
		}
	}
`;

const Item = styled(motion.div)``;

function BottomBar({ onboardingReset, show }) {
	const animate = {
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: { duration: 0.3 },
	};

	const share = () => {
		const url = "https://tender-roentgen-251c59.netlify.com";
		//const url = "http://localhost:3000";
		const state = store.getState();
		const {
			power,
			keyboard,
			sequencer,
			amp,
			meta,
			oscilloscope,
			onboarding,
			...patch
		} = state.state;

		//delete state.state.meta
		const string = JSON.stringify(patch);
		function copyStringToClipboard(str) {
			// Create new element
			var el = document.createElement("textarea");
			// Set value (string to be copied)
			el.value = str;
			// Set non-editable to avoid focus and move outside of view
			el.setAttribute("readonly", "");
			el.style = { position: "absolute", left: "-9999px" };
			document.body.appendChild(el);
			// Select text inside element
			el.select();
			// Copy text to clipboard
			document.execCommand("copy");
			// Remove temporary element
			document.body.removeChild(el);
		}

		//var queryString = Object.keys(state.state).map(key => key + '=' + state.state[key]).join('&');
		//  copyStringToClipboard(string)

		copyStringToClipboard(url + "#" + encodeURIComponent(string));
		alert("Copied to clipboard!");
	};
	return (
		<Container>
			<AnimatePresence>
				{show && [
					<Item {...animate}>
						<a onClick={onboardingReset}>How to use </a>
					</Item>,
					<Item {...animate}>
						<span>Made by </span>
						<a target="_black" href="https://twitter.com/juliussohn">
							Julius Sohn
						</a>
					</Item>,
					<Item {...animate}>
						<a onClick={share}>Share Patch </a>
					</Item>,
				]}
			</AnimatePresence>
		</Container>
	);
}

const mapStateToProps = (state) => {
	return {
		...state.state.onboarding,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ onboardingReset }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomBar);
