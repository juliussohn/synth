const presets =  [
    {//0
      
        general: {
          octave: 0,
          glide: 0,
          preset: 0
        },
        
        vco: [
          {
            pitch: 0,
            gain: 1,
            octave: 0,
            semitones: 0,
            detune: 0,
            type: 'sine'
          },
          {
            pitch: 0,
            type: 'sawtooth',
            gain: 0,
            octave: 0,
            semitones: 0,
            detune: 0
          },
          {
            pitch: 0,
            type: 'sawtooth',
            gain: 0,
            octave: 0,
            semitones: 0,
            detune: 0
          }
        ],
        
        envelope: {
          attack: 0,
          decay: 0,
          release: 0,
          sustain: 100
        },
        filter: {
          frequency: 1512.7153011703033,
          resonance: 0
        },
        filterEnvelope: {
          sustain: 100,
          intensity: 0,
          attack: 0,
          decay: 0,
          release: 0
        }
      },
    {//1
      
        vco: [
          {
            pitch: 0,
            type: 'sawtooth',
            gain: 1,
            octave: 0,
            semitones: 0,
            detune: 0
          },
          {
            pitch: 0,
            type: 'sawtooth',
            octave: 0,
            detune: 10,
            semitones: 7,
            gain: 1
          },
          {
            pitch: 0,
            octave: 0,
            semitones: 0,
            type: 'square',
            detune: 2.142857142857146,
            gain: 0.31363636363636366
          }
        ],
        general: {
          preset: 0,
          octave: -1,
          glide: 0.08035714285714286
        },
        filter: {
          resonance: 1,
          frequency: 899.9248073623645
        },
        filterEnvelope: {
          attack: 0.2,
          release: 0.5,
          sustain: 48.035714285714285,
          decay: 0.95,
          intensity: 36.60714285714286
        },
        envelope: {
          decay: 0.2,
          sustain: 100,
          release: 0.8321428571428571,
          attack: 0.01499999999999996
        }
      },
      //3
      {
        power: {
          active: true
        },
        envelope: {
          sustain: 0,
          attack: 0.006428571428571418,
          decay: 0.7821428571428571,
          release: 0.7392857142857142
        },
        general: {
          preset: 0,
          octave: 2,
          glide: 0
        },
        filterEnvelope: {
          attack: 0.010714285714285714,
          intensity: 100,
          decay: 0.46785714285714286,
          release: 0.3964285714285714,
          sustain: 40.714285714285715
        },
        vco: [
          {
            pitch: 0,
            octave: 0,
            semitones: 0,
            detune: 0,
            gain: 0.8136363636363636,
            type: 'square'
          },
          {
            pitch: 0,
            octave: 0,
            type: 'triangle',
            detune: 11.25,
            semitones: 7,
            gain: 0.6363636363636365
          },
          {
            pitch: 0,
            octave: 0,
            gain: 1,
            semitones: 12,
            detune: 18.214285714285722,
            type: 'square'
          }
        ],
        filter: {
          resonance: 0,
          frequency: 765.4388234673022
        }
      },
      //4
      {
        power: {
          active: true
        },
        general: {
          glide: 0,
          preset: 3,
          octave: -1
        },
        filter: {
          resonance: 0,
          frequency: 514.4382313196404
        },
        filterEnvelope: {
          sustain: 0,
          intensity: 54.10714285714286,
          release: 0.45,
          attack: 0.48214285714285693,
          decay: 0.6749999999999999
        },
        envelope: {
          decay: 0,
          release: 0,
          sustain: 100,
          attack: 0.36428571428571427
        },
        vco: [
          {
            pitch: 0,
            octave: 0,
            semitones: 0,
            detune: 0,
            type: 'sawtooth',
            gain: 1
          },
          {
            pitch: 0,
            octave: 0,
            detune: 0,
            type: 'sine',
            semitones: -12,
            gain: 0.6727272727272726
          },
          {
            pitch: 0,
            octave: 0,
            semitones: 0,
            detune: 0,
            type: 'sine',
            gain: 0
          }
        ]
      },//
      {
        power: {
          active: true
        },
        envelope: {
          attack: 2,
          decay: 2,
          sustain: 54.46428571428571,
          release: 2
        },
        filter: {
          resonance: 2.142857142857143,
          frequency: 100
        },
        filterEnvelope: {
          sustain: 100,
          decay: 0,
          attack: 2,
          release: 1.7571428571428571,
          intensity: 50.35714285714286
        },
        vco: [
          {
            pitch: 0,
            octave: 0,
            semitones: 0,
            detune: 0,
            type: 'sine',
            gain: 0.75
          },
          {
            pitch: 0,
            octave: 0,
            gain: 0.7954545454545454,
            type: 'triangle',
            detune: 12.32142857142857,
            semitones: 3
          },
          {
            pitch: 0,
            octave: 0,
            type: 'square',
            gain: 0.4681818181818182,
            detune: -7.5,
            semitones: 7
          }
        ],
        general: {
          preset: 0,
          glide: 0.41785714285714287,
          octave: 1
        }
      }
]

export default presets;