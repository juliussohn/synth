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

	async function share() {
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

		const string = JSON.stringify(patch);
		function copyStringToClipboard(str) {
			var el = document.createElement("textarea");
			el.value = str;
			el.setAttribute("readonly", "");
			el.style = { position: "absolute", left: "-9999px" };
			document.body.appendChild(el);
			el.select();
			document.execCommand("copy");
			document.body.removeChild(el);
		}

		//var queryString = Object.keys(state.state).map(key => key + '=' + state.state[key]).join('&');
		//  copyStringToClipboard(string)

		const long_url = url + "#" + encodeURIComponent(string);
		console.log(long_url);

		const response = await fetch("https://api-ssl.bitly.com/v4/shorten", {
			method: "POST",
			headers: new Headers({
				Authorization: "Bearer 0fd40510df1fb0a5d106d8c02e61eb92145390ca",
				"Content-Type": "application/json",
			}),
			body: JSON.stringify({
				long_url,
			}),
		})
			.then((res) => res.json())
			.then(
				(result) => {
					console.log(result.link);
					copyStringToClipboard(result.link);
					alert("Copied to clipboard!");
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				(error) => {
					alert("Something went wrong");
				}
			);
	}

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
						<a onClick={share}>Copy patch link </a>{" "}
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
