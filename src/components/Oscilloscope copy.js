import React from 'react';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';


const Container = styled.div`
    display:flex;
    justify-content:center;

`


const Console = styled.div`
  background:black;
  font-family:monospace;
  position:absolute;
  left:0;
  padding: 5px;
  top:0%;
  text-align:left;
  width:400px;
  overflow:hidden;

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
    const { dataArray, currentTime, note, fftSize } = props
    const canvasRef = useRef();
    let i = 0;

    const [periodS, setPeriod] = useState(0);
    const [offsetS, setOffset] = useState(0);

    useEffect(() => {
        let canvas = canvasRef.current;
        let context = canvas.getContext('2d');

        let ratio = getPixelRatio(context); //2

        let width = getComputedStyle(canvas)
            .getPropertyValue('width')
            .slice(0, -2);


        let height = getComputedStyle(canvas)
            .getPropertyValue('height')
            .slice(0, -2);
        canvas.width = width * ratio; //200
        canvas.height = height * ratio;//200
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        let requestId;
        const bufferLength = dataArray.length;

        const render = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);

            var sliceWidth = canvas.width * 1 / bufferLength;
            var x = 0;


            context.lineWidth = 2;
            context.strokeStyle = 'rgb(255, 255, 255)';
            context.beginPath();

            const sampleRate = 44100;
            const sampleTime = sampleRate * currentTime;
            const period = (sampleRate / note.freq) ;
            const sampleOffset = sampleTime % period;

            setPeriod(period)



            setOffset(sampleOffset)
            //  console.log('offset', sampleOffset)

            //  for (var i = 0; i < dataArray.length; i++) {
            sliceWidth = canvas.width * 1 / period

            for (var i = 0; i < period; i++) {
                //console.log(Math.ceil(sampleOffset), dataArray[i], dataArray);

                var v = dataArray[i] * 100.0;
                var y = v + canvas.height / 2;
                x = sliceWidth * i;
                if (i === 0) {
                    context.moveTo(x, y);
                } else {
                    context.lineTo(x, y);
                }


            }
            context.lineTo(canvas.width, canvas.height / 2);
            context.stroke();


            requestId = requestAnimationFrame(render);

        };

        render();

        return () => {
            cancelAnimationFrame(requestId);
        }

    });

    return (
        <Container>
            <Console>Freq:  {note.freq}<br />
    Time: {currentTime}<br />
    Period: {periodS}<br />
    Offset: {offsetS}</Console>

            <canvas ref={canvasRef} width={100} height={100} />

        </Container>

    );
}

const mapStateToProps = (state) => {

    return {
        dataArray: state.state.oscilloscope.dataArray,
        fftSize: state.state.oscilloscope.fftSize,
        currentTime: state.state.general.currentTime,
        note: state.state.keyboard.note,

    }
}


export default connect(mapStateToProps, null)(Oscilloscope);
