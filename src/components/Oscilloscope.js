import React from 'react';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';


const Container = styled.div`
    padding:4px;
    background: linear-gradient(180deg, rgba(36, 36, 36, 0.9) 0%, rgba(23, 23, 23, 0.9) 100%);
    border: 1px solid rgba(33, 33, 33, 0.4);
    border-radius:6px;
    margin: 8px;
    width:auto;
    height:110px;
    position:relative;
`

const Display = styled.div`
   background: linear-gradient(180deg, #1E1E1E 0.01%, #101010 100%);
    border-radius: 2px;
    position:relative;
    height:100%;
    &>*{
        opacity:${props => props.power == true ? 1 : 0};
        transition:all .5s;
        transition-delay:.2s;
    }
  
`

const Canvas = styled.canvas`
width:auto;
position:absolute;
top:0;
left:0
width:100%;
height:100%;
`

const getPixelRatio = context => {
    var backingStore =
        context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio ||
        1;

    return (window.devicePixelRatio || 1) / backingStore;
};


function Oscilloscope(props) {
    const { dataArray, currentTime, note, fftSize, power } = props
    const canvasRef = useRef();
    let i = 0;
    let lastData = dataArray;

    const [periodS, setPeriod] = useState(0);
    const [offsetS, setOffset] = useState(0);

    useEffect(() => {
        let canvas = canvasRef.current;
        let context = canvas.getContext('2d');

        context.clearRect(0, 0, canvas.width, canvas.height);
      //  if (!power) return

        let ratio = getPixelRatio(context); //2

        let width = getComputedStyle(canvas)
            .getPropertyValue('width')
            .slice(0, -2);


        let height = getComputedStyle(canvas)
            .getPropertyValue('height')
            .slice(0, -2);
        // canvas.width = width * ratio; //200
        //canvas.height = height * ratio;//200
        // canvas.style.width = `${width}px`;
        //canvas.style.height = `${height}px`;

        let requestId;
        const bufferLength = dataArray.length;

        const render = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);

            var x = 0;


            context.lineWidth = 2;
            context.strokeStyle = '#11CD43';
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            context.shadowBlur = 12;
            context.shadowColor = "rgba(17, 205, 67, 0.88)";
            context.beginPath();
            const sampleRate = 44100;
            let period = (sampleRate / note.freq) * 3;

            /*
             const sampleTime = sampleRate * currentTime;
             const sampleOffset = sampleTime % period;
 */

            let last;
            let start = 0;
            let end = dataArray.length;
            for (var i = 0; i < dataArray.length; i++) {
                if (last > 0 && dataArray[i] < 0) {
                    start = i;
                }

                if (start && last < 0 && dataArray[i] > 0) {
                    end = i + (i - start) * 5
                    break;

                }
                last = dataArray[i]
            }


            // period = end - start
            let max = Math.max(...dataArray);
            max = max < 1 ? 1 : max;
            var sliceWidth = canvas.width * 1 / period;

            for (var i = 0; i < period; i++) {
                var v = (dataArray[i + start] * 95) / (max * 2);
                var y = v + (canvas.height) / 2;
                x = sliceWidth * i;
                if (i === 0) {
                    context.moveTo(x, y);
                } else {
                    context.lineTo(x, y);
                }


            }
            context.stroke();


            requestId = requestAnimationFrame(render);
        };
        lastData = dataArray

        render();

        return () => {
            cancelAnimationFrame(requestId);
        }

    });

    return (
        <Container>

            <Display power={power}>
                <Canvas ref={canvasRef} />
            </Display>
        </Container>

    );
}

const mapStateToProps = (state) => {

    return {
        dataArray: state.state.oscilloscope.dataArray,
        fftSize: state.state.oscilloscope.fftSize,
        currentTime: state.state.general.currentTime,
        note: state.state.keyboard.note,
        power: state.state.power.active

    }
}


export default connect(mapStateToProps, null)(Oscilloscope);
