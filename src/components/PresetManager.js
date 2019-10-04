import React from 'react';
import styled from 'styled-components';
import { store } from '../store';
import { defaultState } from '../reducers/reducers';
import { savePreset, getPresets, clearPresets } from '../localStorage'
import { bindActionCreators } from 'redux';
import { setParam, setPreset } from '../actions/actions.js';
import { connect } from 'react-redux';
import { metaProperty } from '@babel/types';


const Preset = styled.div`
`

class PresetManager extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            presetName: props.meta.presetName,
            presets: []
        }
    }
    componentDidMount() {
        this.fetch()
        window.addEventListener("hashchange", this.loadFromUrl.bind(this), false);
        
        this.loadFromUrl();

    }
   
    loadFromUrl(href){
        if (window.location.hash) {
            var hash = decodeURIComponent(window.location.hash.substring(1)); //Puts hash in variable, and removes the # character
            var loadState = JSON.parse(hash)
            if (loadState) {
                this.loadPreset(loadState);
            }
        }
        window.dispatchEvent(new Event('popstate'));

    }
    onNameChange(e) {
        this.setState({ presetName: e.target.value });

    }

    onSave() {
        this.props.setParam('meta', false, 'presetName', this.state.presetName)

        const state = store.getState()
        savePreset(state.state, this.state.presetName)
        this.fetch()
    }

    onClear() {
        let confirmed = window.confirm("DELETE ALL? SURE?");
        if (!confirmed) return

        clearPresets();
        this.setState({ presetName: '' });
        this.fetch()

    }

    onExport() {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.state.presets)));
        element.setAttribute('download', "synth-presets");
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    onShare() {
        const url = 'https://tender-roentgen-251c59.netlify.com'
        //const url = 'http://localhost:3000'
        const state = store.getState()
        delete state.state.keyboard
        delete state.state.sequencer
        delete state.state.meta
        const string = JSON.stringify(state.state)
        function copyStringToClipboard(str) {
            // Create new element
            var el = document.createElement('textarea');
            // Set value (string to be copied)
            el.value = str;
            // Set non-editable to avoid focus and move outside of view
            el.setAttribute('readonly', '');
            el.style = { position: 'absolute', left: '-9999px' };
            document.body.appendChild(el);
            // Select text inside element
            el.select();
            // Copy text to clipboard
            document.execCommand('copy');
            // Remove temporary element
            document.body.removeChild(el);
        }

        var queryString = Object.keys(state.state).map(key => key + '=' + state.state[key]).join('&');

        console.log(queryString);
        
        copyStringToClipboard(url + '#' + encodeURIComponent(string))
        alert('Copied to clipboard!')
    }

    fetch() {
        console.log(getPresets())
        this.setState({ presets: getPresets() });


    }

    loadPreset(preset) {
        this.props.setPreset(preset)
        this.setState({ presetName: preset.meta.presetName });

    }



    render() {

        const { props } = this

        return (
            <div className="PresetManager">
                <input type="text" placeholder="Enter preset name" onChange={this.onNameChange.bind(this)} value={this.state.presetName} />
                <button onClick={this.onSave.bind(this)}>SAVE</button>
                <button onClick={() => { this.loadPreset(defaultState) }}>DEFAULT</button>
                <h4>Saved Presets</h4>
                <select style={{ width: 100 }} size={this.state.presets.length == 0 ? 2 : this.state.presets.length + 1}>
                    {this.state.presets.map(p => {
                        return <option onClick={() => { this.loadPreset(p) }}>{p.meta.presetName}</option>
                    })}
                </select>
                <button onClick={this.onClear.bind(this)}>DELETE ALL</button>
                <button onClick={this.onExport.bind(this)}>EXPORT ALL</button>
                <button onClick={this.onShare.bind(this)}>SHARE PATCH</button>

            </div>
        );
    }

}
const mapStateToProps = (state) => {
    return {
        ...state.state
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ setParam, setPreset }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(PresetManager);
